---
name: orchestrator
description: Manages the full CR cycle from UX prototype to implementation of the approved package, coordinating authors, reviewers, and a mediator.
---

# Orchestrator

Coordinate work in the main agent; delegate subject-specific decisions, reviews, and mediation to separate participants.

Choose the language of communication and generated documents according to the user's request and project rules.

## Prepare the Work

1. Read project rules, relevant mistake records, the request, and user decisions already made. When resuming, restore the current stage, participants, and versions of reviewed and approved materials.
2. Create or locate the CR under project rules and the [material storage rules](references/material-storage.md), assigning material owners and a single author for the current edit to the shared tree. When working with the tree, use its [maintenance and handoff rules](references/decision-tree.md); link canonical materials from the CR without copying them.
3. Give each participant the skill path, goal, CR version, relevant tree nodes, input materials, confirmed information with sources, expected result, file scope, and [material storage rules](references/material-storage.md). State that the working directory is shared and others' changes must be preserved.
4. Use the [diagram rules](references/diagrams.md) for design materials. Return findings to the same author and corrections to the same reviewer.

Default launch settings:

| Participant | Type | Model | Reasoning Effort |
| --- | --- | --- | --- |
| Package authors and solution reviewer | `default` | `gpt-6.1-sol` | `xhigh` |
| Implementer | `worker` | `gpt-6.1-sol` | `xhigh` |
| Code reviewer | `default` | `gpt-6.1-sol` | `xhigh` |
| Mediator | `default` | `gpt-6.1-sol` | `xhigh` |

Launch participants with `fork_turns: none`, respecting explicit user settings. Resolve unavailable or ambiguous launch parameters with the user without silently substituting them.

## Prepare and Present the Package

1. For changed UI, invoke [$ux-designer](../ux-designer/SKILL.md), show the checked prototype, and obtain verification of the specific version before preparing the full product brief; a blocking product question may be sent to the product manager earlier. If there are no UI changes, record the reason for skipping this step.
2. Give the task, confirmed prototype, and shared tree to [$define-product-change](../define-product-change/SKILL.md). Obtain a CR with the goal, scope, accepted domain model, and chosen approach.
3. Give the product brief to [$develop-user-scenarios](../develop-user-scenarios/SKILL.md). Obtain scenarios and verifiable functional and non-functional requirements (FRs/NFRs).
4. Give the product brief and requirements to [$design-project-architecture](../design-project-architecture/SKILL.md). Obtain the architecture, contracts, and map of specific files to change.
5. Give the package to [$design-test-scenarios](../design-test-scenarios/SKILL.md), then return the result to the architect. Before planning, obtain a map that accounts for necessary changes to tests, data, and the environment.
6. Give the completed map and checks to [$plan-change-implementation](../plan-change-implementation/SKILL.md). Obtain a plan covering the entire scope in verifiable stages.
7. Give the original request, user decisions, and entire package to a separate [$review-solution](../review-solution/SKILL.md) agent who did not participate in authorship. Return findings to the owners and obtain a follow-up review of corrections.
8. After `ACCEPT`, create a separate Markdown summary file in the CR package under the [summary requirements](references/cr-summary.md) and show it to the user.
9. Obtain the user's authorization to implement this package version without intermediate document approvals, and follow the [execution instructions](references/execution.md). When continuing an approved version, use the authorization already given.

## Resolve Questions and Returns

1. Assign investigation of available facts to the owner of the question. Route product decisions to the product manager, requirements to the analyst, contracts and files to the architect, and checks to the tester.
2. When a user answer is needed, stop work, including subagents, and end the turn with the full list of ready questions, options, consequences, and recommendations in a normal chat message. Do not use built-in forms or continue work until the user answers.
3. Give the owner only unambiguously confirmed decisions, preserving unanswered questions. Clarify only what is ambiguous, and do not treat silence or an answer to a clarification as authorization to implement.
4. Update affected materials through their owners. When verified UI changes, first return the prototype to the designer and obtain verification of the new version, then continue dependent stages.
5. When pausing because of a skill requirement, link to the applicable section, quote the requirement, and explain what answer is needed.

## Refer Disputes to a Mediator

1. In a reasoned disagreement, invoke a separate [$mediate-solution](../mediate-solution/SKILL.md) agent who was not a party to the dispute. Provide material versions, positions, sources, and participant IDs; the mediator retains control of the discussion and log.
2. At the mediator's request, involve the needed expert and check that the launch settings are applicable. Resume dependent acceptance after `RESOLVED`, assign rework under `REWORK_REQUIRED` to its owners, and route questions under `NEEDS_INPUT` to the owner of the answer.
3. After corrections, obtain confirmation from the owners and, for a review dispute, the relevant reviewer's verdict as well. Include links to logs and brief outcomes, including withdrawn findings, in the handoff to the user.
