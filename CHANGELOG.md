# Changelog

All skills are released as one bundle. Its version is stored in [VERSION](VERSION), and the release process is described in [RELEASE.md](RELEASE.md).

## [Unreleased]

- Added the MIT License for the bundle and preserved Matt Pocock's notices for instructions adapted from `mattpocock/skills`.
- Added a quick start covering cloning and installation, starting a task through the orchestrator, approving the plan, and receiving the implementation result.
- Installation from a working copy or release now copies the entire bundle to `~/.agents/skills/agents_driven_sdlc/`, including the version, license, and attribution notices. Reinstallation replaces this folder in full; source changes take effect only after reinstallation.
- Moved shared storage rules into a separate reference: current materials for each CR are stored in a folder named with its identifier and short title. Temporary reports and diagnostics are stored outside the project tree and are not included in Git or permanent documents.
- The CR summary links only to the main current documents. Run results are shared temporarily with participants and removed after dependent reviews; documents retain brief verification summaries.
- Translated all tracked documentation, skill instructions, references, metadata, and installer messages into English. Communication and generated documents follow the language specified by the user's request and project rules.
- Made `visualize` and `modern-web-guidance` recommended UX dependencies, with local interactive previews and official documentation as alternatives. Missing helper skills do not block the workflow; prototype checks and explicit user approval remain required.
- Set all default subagent launches, including mediation, to `gpt-6.1-sol` with `xhigh` reasoning effort.

### Migrating to Copied Installation

Run the new `scripts/install.sh`. It removes old symlinks at the root of the user's skills directory if they point to this clone or another clone of `CrazyViper/agents_driven_sdlc`. If an ordinary file, directory, or unverified symlink conflicts with installation, the installer stops before replacing the bundle; move the conflicting path manually.

The installer preserves other user skills. Files inside `agents_driven_sdlc/` are replaced in full, so make changes in the source repository. Release `v0.1.0` contains the previous symlink installer; running it again does not roll back the new installation.

## [0.1.0] - 2026-10-27

The first versioned bundle based on the existing skills.

### Included

- Nine skills covering UX prototyping, product definition, scenarios, architecture, verification, planning, review, mediation, and implementation orchestration.
- Shared guidance on the decision tree, concepts, architectural decisions, diagrams, and the CR summary.
- An installer for user-level symlinks that protects ordinary files and directories from being overwritten.

### Added

- A shared SemVer version for the bundle and release rules.
- Instructions for installing, updating, and rolling back to a specific tag through a separate worktree.

### Migration

Skill contents and names are preserved. To migrate from an installation based on a working copy, follow the [instructions for installing a specific version](https://github.com/CrazyViper/agents_driven_sdlc/blob/v0.1.0/README.md#%D0%BA%D0%BE%D0%BD%D0%BA%D1%80%D0%B5%D1%82%D0%BD%D0%B0%D1%8F-%D0%B2%D0%B5%D1%80%D1%81%D0%B8%D1%8F) once the `v0.1.0` tag is available.
