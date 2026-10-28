# agents_driven_sdlc

A bundle of skills for the full software development lifecycle (SDLC): from refining an idea through creating interactive prototypes and designing the architecture to writing code, adding test coverage, and reviewing the complete set of changes.

Each cycle focuses on a single product change, documented in a CR (change request) package.

Communication and generated documents follow the language specified by the user's request and project rules.

## Quick Start

You need Git, Bash, and a configured local Codex with subagent support. Check that the models in the [orchestrator settings](skills/orchestrator/SKILL.md#prepare-the-work) are available. UI work uses `visualize` and `modern-web-guidance`.

This quick start installs the current `main` branch.

### 1. Clone the Repository and Install the Skill Bundle

Run in Bash:

```bash
git clone --branch main https://github.com/CrazyViper/agents_driven_sdlc.git &&
cd agents_driven_sdlc &&
bash scripts/install.sh
```

The installer copies nine skills to `~/.agents/skills/agents_driven_sdlc/` and prints the installed bundle version and skill count. After a successful installation, you can delete the repository clone.

### 2. Open Your Project and Start the Orchestrator

Open your project in Codex and enter this in a new chat:

```text
$orchestrator add the ability to mark an entry as a favorite
```

Replace the example with your task. If the skill is not detected, check that `~/.agents/skills/agents_driven_sdlc/orchestrator/SKILL.md` exists and restart Codex.

### 3. Answer Questions, Approve the Prototype, Then the Architecture and Plan, and Accept the Completed Work

The orchestrator studies the project, asks questions to clarify the task, and takes it through these stages:

1. First, it prepares a prototype and shows it to you for approval. This stage is skipped for tasks without interface changes.
2. After you approve the prototype, it prepares the detailed design and implementation plan, then presents them for separate approval.
3. Only after you explicitly approve the solution and plan does it proceed with implementation, checks, and reviews.

The prototype and plan can be revised based on your feedback as many times as needed. The orchestrator moves to the next stage once you are satisfied with the result and approve it.

## Skills

| Skill | Output |
| --- | --- |
| [orchestrator](skills/orchestrator/SKILL.md) | Role coordination, package approval, and plan execution. |
| [ux-designer](skills/ux-designer/SKILL.md) | A verified interactive prototype and user decisions. |
| [define-product-change](skills/define-product-change/SKILL.md) | The CR goal and scope, domain model, and chosen approach. |
| [develop-user-scenarios](skills/develop-user-scenarios/SKILL.md) | Scenarios and verifiable functional and non-functional requirements. |
| [design-project-architecture](skills/design-project-architecture/SKILL.md) | Architecture, contracts, and a map of specific files. |
| [design-test-scenarios](skills/design-test-scenarios/SKILL.md) | Coverage, test scenarios, and data and environment conditions. |
| [plan-change-implementation](skills/plan-change-implementation/SKILL.md) | A plan of stages that can be verified in sequence. |
| [review-solution](skills/review-solution/SKILL.md) | A verdict on a specific version of the complete package. |
| [mediate-solution](skills/mediate-solution/SKILL.md) | Verified grounds for a disagreement and a log of its resolution. |

The rules for [diagrams](skills/orchestrator/references/diagrams.md), [execution](skills/orchestrator/references/execution.md), and [mediation](skills/mediate-solution/references/discussion.md) are in their respective references.

Subagent types, models, and reasoning effort levels are listed under "Default launch settings" in the [orchestrator skill](skills/orchestrator/SKILL.md#prepare-the-work). Change the relevant settings and run `bash scripts/install.sh` again.

Use the [decision tree](skills/orchestrator/references/decision-tree.md) when working through alternatives, the [concept guidance](skills/define-product-change/references/concepts.md) when clarifying terms, and the [decision record guidance](skills/design-project-architecture/references/decision-records.md) for architectural decisions that are hard to reverse. Apply these instructions as needed for the task.

## Versioning and Change History

- The shared bundle version is stored in [VERSION](VERSION).
- Changes are documented in [CHANGELOG.md](CHANGELOG.md).
- SemVer and release rules are in [RELEASE.md](RELEASE.md).

## License

The bundle is distributed under the [MIT License](LICENSE). Adapted materials and attribution notices are listed in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
