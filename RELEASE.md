# Release Rules

## Versioning Unit

The bundle includes all skills, their `agents/openai.yaml` files, references, and the installer. They are released together; individual skills do not receive separate version numbers.

[VERSION](VERSION) contains a single [SemVer](https://semver.org/) version without the `v` prefix; the version in [package.json](package.json) must match. A release is identified by an annotated `v<version>` tag on the commit containing that value and a matching entry in [CHANGELOG.md](CHANGELOG.md). A version number in the working copy without a tag does not yet indicate a released version.

Published tags and release contents are immutable. A fix receives a new version number; also record the full commit SHA for exact reproduction.

## Compatibility

The bundle's contract includes skill names and invocation conditions, required inputs and outputs, statuses and handoffs between roles, approval conditions, and tool and installation requirements.

| Change | Before `1.0.0` | From `1.0.0` Onward |
| --- | --- | --- |
| Fix without a contract change | Patch: `0.1.0 → 0.1.1` | Patch: `1.0.0 → 1.0.1` |
| Compatible new capability | Minor: `0.1.0 → 0.2.0` | Minor: `1.0.0 → 1.1.0` |
| Incompatible contract change | Minor: `0.1.0 → 0.2.0`, with migration instructions | Major: `1.0.0 → 2.0.0`, with migration instructions |

The `0.x` rule is a convention of this repository; SemVer does not promise stability before `1.0.0`. Version `1.0.0` signals readiness to maintain the contract. A prerelease suffix such as `0.2.0-rc.1` may be used for preliminary validation.

Assess behavioral changes, including `description`, approval conditions, and model settings, regardless of the size of the text edit. A new mandatory dependency or a renamed skill is an incompatible change. The bundle version does not pin Codex, model, or external skill versions; record material requirement changes in the changelog.

## Preparing a Release

1. Update `Unreleased` as changes are made: describe user-visible changes, incompatibilities, and migration steps. When installation changes, describe migration and the limits of rolling back to the old format.
2. Before release, choose a version using the table, update `VERSION` and `package.json`, and move accumulated entries into a section with the version and date in `YYYY-MM-DD` format. Leave an empty `Unreleased` section for future changes.
3. Validate frontmatter and structure for all skills using the standard `quick_validate.py`; check installer syntax, affected links, and consistency between `agents/openai.yaml` and the instructions. For a behavioral change, check the affected scenario and a meaningful opposite case.
4. Run `npm test` to check bundle copying, reinstallation, updates, rollback, conflicts, and npx installation from the actual npm tarball. Tests use temporary directories and an isolated npm cache; unrelated files must be preserved when conflicts occur. Check the Windows and Linux CI results before release.
5. Review the diff and commit only release files. Do not include `mistakes.md` or temporary operational reports in the commit. After committing, create a tag on the verified state.

Structural validation requires Python 3 with PyYAML and an installed `skill-creator`. Run these commands from the repository root; if the skill is installed elsewhere, set `validator` to its actual path:

```bash
(
  set -e
  validator="${CODEX_HOME:-$HOME/.codex}/skills/.system/skill-creator/scripts/quick_validate.py"
  for skill_dir in skills/*; do
    python3 "$validator" "$skill_dir"
  done
  node --check scripts/install.cjs
  git diff --check
)
```

## Tagging and Publishing

Run these steps after committing the release files. The working tree must be clean; preserve unrelated uncommitted files outside it or use a separate clean worktree. Check that the changelog section matches `VERSION`.

```bash
(
  set -e
  test -z "$(git status --porcelain)"
  release_version="$(cat VERSION)"
  git tag -a "v${release_version}" -m "Release ${release_version}"
  git rev-parse "refs/tags/v${release_version}^{commit}"
)
```

To publish, first push the release commit to the agreed branch, then push only the intended tag:

```bash
git push origin "refs/tags/v$(cat VERSION)"
```

Do not force-overwrite a tag. Follow the [README](README.md#quick-start) to install between tasks so that all participants in a task use the same bundle.

The npx command downloads the package directly from GitHub; publishing to the npm registry is not required. A release tag containing `package.json` can be installed with `npx github:CrazyViper/agents_driven_sdlc#v<version>`.
