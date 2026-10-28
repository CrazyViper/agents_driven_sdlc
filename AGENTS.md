## Purpose

- This repository contains shared Codex skills and agents for agent-driven software development.
- Do not add component names, documentation paths, infrastructure constraints, or other project-specific rules to shared skills. Such rules belong in the relevant project's `AGENTS.md`.

## Structure and Validation

- Each skill lives in `skills/<skill-name>` and contains `SKILL.md`.
- Keep `agents/openai.yaml` consistent with `SKILL.md`.
- Each custom agent lives in `agents/<agent-name>.toml`. Do not duplicate instructions from the skill it is based on.
- After changes, validate frontmatter and structure using the standard `quick_validate.py` from `skill-creator`.
- Check installer syntax with `node --check scripts/install.cjs` and run `npm test`.
- Do not copy skills or agents into projects. For local use, run `node scripts/install.cjs`, which copies the bundle to the user directory `~/.agents/skills/agents_driven_sdlc/`. Install or reinstall only when the user explicitly requests it.
- Keep `mistakes.md` local; do not add it to Git.
