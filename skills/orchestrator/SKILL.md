---
name: orchestrator
description: Coordinates proportionate CR design, implementation, and acceptance, using a compact route for local changes and a full cycle for substantial uncertainty.
---

# Orchestrator

Coordinate work in the main agent; involve subject-specific participants where the chosen route needs them, keeping reviews independent of authorship.

Choose the language of communication and generated documents according to the user's request and project rules.

Maintain one authoritative release notes block in the [Markdown CR summary](references/cr-summary.md) on either route.

## Prepare the Work

1. Read project rules, the request, and user decisions already made. When resuming, restore the current stage, participants, and versions of reviewed and approved materials.
2. Choose the route below and create or locate the CR under project rules and the [material storage rules](references/material-storage.md). Assign material owners and a single author for each shared edit; when decisions need a tree, use its [maintenance and handoff rules](references/decision-tree.md) and link canonical materials without copying them.
3. Give each needed participant the skill path, goal, CR version, relevant decisions, available input materials, confirmed information with sources, expected result, file scope, and [material storage rules](references/material-storage.md). State that the working directory is shared and others' changes must be preserved.
4. Use the [diagram rules](references/diagrams.md) for design materials. Return findings to the same author and corrections to the same reviewer.

Default launch settings:

| Participant | Type | Model | Reasoning Effort |
| --- | --- | --- | --- |
| Package authors and solution reviewer | `default` | `gpt-6.1-sol` | `xhigh` |
| Implementer | `worker` | `gpt-6.1-sol` | `xhigh` |
| Code reviewer | `default` | `gpt-6.1-sol` | `xhigh` |
| Mediator | `default` | `gpt-6.1-sol` | `xhigh` |

Launch participants with `fork_turns: none`, respecting explicit user settings. Resolve unavailable or ambiguous launch parameters with the user without silently substituting them.

## Choose the Route

1. Use the short route for a small local change to existing behavior whose outcome, approach, and impact are clear from the request and confirmed materials. Use the full route below for substantial product or architectural uncertainty; resolve a limited question with its owner without expanding the whole process.
2. For the short route, prepare one compact CR containing the goal, behavior delta, specific files, acceptance criteria, and sufficient checks. Reuse confirmed decisions and materials; the main agent can prepare this CR without invoking every specialist, separate design documents, a package review, new diagrams, or an HTML prototype.
3. Present the compact CR and its separate [summary](references/cr-summary.md), preserving required approvals and permissions and using authorization already covering this scope. Obtain only missing necessary decisions or approval, then follow the [execution instructions](references/execution.md); a single small stage needs one final code review.

When a specialist is needed on the short route, it updates only the relevant CR section using applicable existing inputs; the full-route artifact list is not a prerequisite.

## Prepare and Present the Full Package

1. For UI decisions needing user verification, invoke [$ux-designer](../ux-designer/SKILL.md), show the checked prototype, and obtain verification of the specific version before preparing the full product brief; a blocking product question may be sent to the product manager earlier. Otherwise, reuse sufficient accepted UI materials and record why a new prototype is unnecessary.
2. Give the task, applicable accepted UI materials, and shared tree to [$define-product-change](../define-product-change/SKILL.md) for the CR goal, scope, accepted domain model, chosen approach, and draft release notes.
3. Give the product brief to [$develop-user-scenarios](../develop-user-scenarios/SKILL.md). Obtain scenarios and verifiable functional and non-functional requirements (FRs/NFRs).
4. Give the product brief and requirements to [$design-project-architecture](../design-project-architecture/SKILL.md). Obtain the architecture, contracts, and map of specific files to change.
5. Give the package to [$design-test-scenarios](../design-test-scenarios/SKILL.md), then return the result to the architect. Before planning, obtain a map that accounts for necessary changes to tests, data, and the environment.
6. Give the completed map and checks to [$plan-change-implementation](../plan-change-implementation/SKILL.md). Obtain a plan covering the entire scope in verifiable stages.
7. Give the original request, user decisions, and entire package to a separate [$review-solution](../review-solution/SKILL.md) agent who did not participate in authorship. Return findings to the owners and obtain a follow-up review of corrections.
8. After `ACCEPT`, create a separate Markdown [summary](references/cr-summary.md) in the CR package with the draft release notes and show it to the user for plan approval.
9. Obtain the user's authorization to implement this package version without intermediate document approvals, and follow the [execution instructions](references/execution.md). When continuing an approved version, use the authorization already given.

## Resolve Questions and Returns

1. Assign investigation of available facts to the owner of the question. Route product decisions to the product manager, requirements to the analyst, contracts and files to the architect, and checks to the tester.
2. When a user answer is needed, stop work, including subagents, and end the turn with the full list of ready questions, options, consequences, and recommendations in a normal chat message. Do not use built-in forms or continue work until the user answers.
3. Give the owner only unambiguously confirmed decisions, preserving unanswered questions. Clarify only what is ambiguous, and do not treat silence or an answer to a clarification as authorization to implement.
4. Update only affected materials through their owners, keeping the route proportionate. If changed UI decisions require renewed user verification, present the affected view or prototype version before dependent implementation; reuse unaffected approvals.
5. When pausing because of a skill requirement, link to the applicable section, quote the requirement, and explain what answer is needed.

## Refer Disputes to a Mediator

1. In a reasoned disagreement, invoke a separate [$mediate-solution](../mediate-solution/SKILL.md) agent who was not a party to the dispute. Provide material versions, positions, sources, and participant IDs; the mediator retains control of the discussion and log.
2. At the mediator's request, involve the needed expert and check that the launch settings are applicable. Resume dependent acceptance after `RESOLVED`, assign rework under `REWORK_REQUIRED` to its owners, and route questions under `NEEDS_INPUT` to the owner of the answer.
3. After corrections, obtain confirmation from the owners and, for a review dispute, the relevant reviewer's verdict as well. Include links to logs and brief outcomes, including withdrawn findings, in the handoff to the user.
