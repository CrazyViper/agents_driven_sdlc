import os
from pathlib import Path
import re
import shutil
import subprocess
import tempfile
import unittest


REPOSITORY = Path(__file__).resolve().parents[1]


class InstallTests(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory(prefix="sdlc-install-")
        self.addCleanup(self.temporary.cleanup)
        self.root = Path(self.temporary.name)
        self.source = self.root / "source with spaces"
        self.source.mkdir()
        for directory in ("skills", "scripts"):
            shutil.copytree(REPOSITORY / directory, self.source / directory)
        for name in ("VERSION", "LICENSE", "THIRD_PARTY_NOTICES.md"):
            shutil.copy2(REPOSITORY / name, self.source / name)
        self.target = self.root / "user skills"
        self.target.mkdir()
        self.bundle = self.target / "agents_driven_sdlc"
        self.names = sorted(path.name for path in (self.source / "skills").iterdir())
        self.environment = {**os.environ, "AGENTS_SKILLS_DIR": str(self.target)}

    def install(self, success=True, source=None):
        result = subprocess.run(
            ["bash", str((source or self.source) / "scripts/install.sh")],
            env=self.environment,
            text=True,
            capture_output=True,
        )
        if success:
            self.assertEqual(result.returncode, 0, result.stderr)
            self.assertIn("Installed bundle", result.stdout)
        else:
            self.assertNotEqual(result.returncode, 0, result.stdout)
        self.assertEqual(list(self.target.glob(".agents_driven_sdlc.*")), [])
        return result

    def snapshot(self):
        return {
            str(path.relative_to(self.bundle)): path.read_bytes()
            for path in self.bundle.rglob("*")
            if path.is_file()
        }

    def inject_command(self, name, script):
        bin_dir = self.root / "bin"
        bin_dir.mkdir(exist_ok=True)
        executable = bin_dir / name
        executable.write_text("#!/bin/bash\n" + script)
        executable.chmod(0o755)
        self.environment["PATH"] = str(bin_dir) + os.pathsep + os.environ["PATH"]

    def test_copy_survives_source_removal_and_keeps_notices_and_links(self):
        self.install()
        self.assertEqual(sorted(p.parent.name for p in self.bundle.glob("*/SKILL.md")), self.names)
        for path in (self.source / "skills").rglob("*"):
            installed = self.bundle / path.relative_to(self.source / "skills")
            if path.is_file():
                self.assertEqual(installed.read_bytes(), path.read_bytes())
        for name in ("VERSION", "LICENSE"):
            self.assertEqual((self.bundle / name).read_bytes(), (self.source / name).read_bytes())
        notices = (self.source / "THIRD_PARTY_NOTICES.md").read_text()
        self.assertEqual((self.bundle / "THIRD_PARTY_NOTICES.md").read_text(), notices.replace("](skills/", "]("))
        original = self.snapshot()
        shutil.rmtree(self.source)
        self.assertEqual(self.snapshot(), original)
        self.assertFalse(any(path.is_symlink() for path in self.bundle.rglob("*")))
        for document in self.bundle.rglob("*.md"):
            for link in re.findall(r"\]\(([^)]+)\)", document.read_text()):
                if "://" not in link and not link.startswith("#"):
                    self.assertTrue((document.parent / link.split("#", 1)[0]).exists(), (document, link))

    def test_reinstall_update_and_rollback_replace_the_whole_bundle(self):
        other = self.target / "other-skill"
        other.mkdir()
        (other / "SKILL.md").write_text("keep me")
        self.install()
        original = self.snapshot()
        self.install()
        self.assertEqual(self.snapshot(), original)
        (self.bundle / "removed-skill").mkdir()
        (self.bundle / "removed-skill/SKILL.md").write_text("old skill")
        (self.bundle / "orchestrator/stale.md").write_text("old reference")
        new_source = self.root / "new release"
        shutil.copytree(self.source, new_source)
        (new_source / "VERSION").write_text("0.2.0\n")
        (new_source / "skills/orchestrator/new.md").write_text("new reference")
        self.install(source=new_source)
        self.assertEqual((self.bundle / "VERSION").read_text(), "0.2.0\n")
        self.assertFalse((self.bundle / "removed-skill").exists())
        self.assertFalse((self.bundle / "orchestrator/stale.md").exists())
        self.assertTrue((self.bundle / "orchestrator/new.md").exists())
        self.install()
        self.assertEqual(self.snapshot(), original)
        self.assertEqual((other / "SKILL.md").read_text(), "keep me")

    def test_migrate_links_to_this_clone_and_a_dangling_retired_link(self):
        for name in self.names + ["plan-implement-review"]:
            (self.target / name).symlink_to(self.source / "skills" / name)
        self.install()
        for name in self.names + ["plan-implement-review"]:
            self.assertFalse((self.target / name).is_symlink())
        self.assertTrue((self.source / "skills/orchestrator/SKILL.md").is_file())

    def test_migrate_links_to_another_clone_of_this_repository(self):
        old_source = self.root / "old clone"
        shutil.copytree(self.source, old_source)
        subprocess.run(["git", "init", "-q", str(old_source)], check=True)
        subprocess.run(["git", "-C", str(old_source), "remote", "add", "origin",
                        "https://github.com/CrazyViper/agents_driven_sdlc.git"], check=True)
        for name in self.names:
            (self.target / name).symlink_to(old_source / "skills" / name)
        self.install()
        self.assertFalse(any((self.target / name).is_symlink() for name in self.names))
        self.assertTrue((old_source / "skills/orchestrator/SKILL.md").is_file())

    def test_foreign_bundle_path_is_preserved(self):
        for kind in ("file", "directory", "symlink"):
            with self.subTest(kind=kind):
                if kind == "file":
                    self.bundle.write_text("keep me")
                elif kind == "directory":
                    self.bundle.mkdir()
                    (self.bundle / "keep.txt").write_text("keep me")
                else:
                    self.bundle.symlink_to(self.source)
                self.install(success=False)
                if kind == "directory":
                    self.assertEqual((self.bundle / "keep.txt").read_text(), "keep me")
                    shutil.rmtree(self.bundle)
                else:
                    self.assertEqual(self.bundle.readlink() if kind == "symlink" else self.bundle.read_text(),
                                     self.source if kind == "symlink" else "keep me")
                    self.bundle.unlink()

    def test_conflicting_legacy_path_leaves_existing_installation_unchanged(self):
        self.install()
        original = self.snapshot()
        conflict = self.target / "orchestrator"
        for kind in ("file", "directory", "symlink", "dangling symlink"):
            with self.subTest(kind=kind):
                if kind == "file":
                    conflict.write_text("keep me")
                elif kind == "directory":
                    conflict.mkdir()
                    (conflict / "keep.txt").write_text("keep me")
                else:
                    conflict.symlink_to(self.root / ("source with spaces" if kind == "symlink" else "missing"))
                self.install(success=False)
                self.assertEqual(self.snapshot(), original)
                if kind == "directory":
                    self.assertEqual((conflict / "keep.txt").read_text(), "keep me")
                    shutil.rmtree(conflict)
                else:
                    self.assertTrue(conflict.is_symlink() if "symlink" in kind else conflict.read_text() == "keep me")
                    conflict.unlink()

    def test_missing_source_and_copy_failure_preserve_previous_installation(self):
        self.install()
        original = self.snapshot()
        source_skill = self.source / "skills/orchestrator/SKILL.md"
        contents = source_skill.read_bytes()
        source_skill.unlink()
        self.install(success=False)
        self.assertEqual(self.snapshot(), original)
        source_skill.write_bytes(contents)
        self.inject_command("cp", "exit 23\n")
        self.install(success=False)
        self.assertEqual(self.snapshot(), original)

    def test_failed_replacement_restores_previous_installation(self):
        self.install()
        original = self.snapshot()
        self.inject_command("mv", 'case "$1" in */next) exit 24;; esac\nexec /bin/mv "$@"\n')
        self.install(success=False)
        self.assertEqual(self.snapshot(), original)


if __name__ == "__main__":
    unittest.main()
