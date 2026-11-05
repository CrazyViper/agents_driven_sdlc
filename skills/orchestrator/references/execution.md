# Executing the Approved Plan

Apply this to an authorized compact CR or full package version, retaining applicable permissions and prior approvals.

## Execute a Stage

1. Restore the approved scope and stages already completed. Stay within user permissions and project rules for environments, data, and external changes.
2. For one small stage, arrange implementation and one independent final code review that also accepts the stage, without an earlier review of the same diff. Otherwise, create a new implementer and separate reviewer for each stage under the settings in the [orchestrator skill](../SKILL.md), starting the next stage after acceptance.
3. Give the implementer the compact CR or relevant full-package materials, specific files, and acceptance criteria. Include applicable verification and cleanup procedures and the [material storage rules](material-storage.md), and state that other participants work in the shared directory and their changes must be preserved.
4. Instruct the implementer to change code, tests, and documentation, verify the result, and clean up the test environment, preserving temporary results until review. Before checking the application, the implementer confirms the version actually in use and the specified data isolation, then reports commands, outcomes, and environment conditions in a message or temporary report.
5. Give the implementer the current release notes and require them to report any differences between actual behavior and the notes to the orchestrator with the stage results.
6. Give the reviewer the same supporting materials, source code, diff, and temporary verification results. The reviewer compares the implementation with agreed behavior and applicable UI decisions, and checks coverage, side effects, and compliance with material storage rules without editing code.
7. Obtain `ACCEPT` or `CHANGES_REQUIRED` with a specific location, evidence, consequence, and required correction. A failed or missing mandatory check rules out `ACCEPT`; an unavailable additional observation alone does not.
8. Return findings to the same implementer and corrections to the same reviewer. Refer reasoned disagreements to the [mediator](../../mediate-solution/SKILL.md) under the orchestrator's rules.
9. After `ACCEPT` and resolution of disputes, check the diff and whether verification results apply to the current version and conditions. Successful results remain applicable while relevant code, data, configuration, and environment inputs are unchanged; repeat only affected checks or checks needed for a demonstrated coverage gap.
10. Mark the stage complete with a brief outcome in the main document, remove your temporary results after all dependent reviews, and continue the remaining agreed scope. Stop work only for a confirmed blocker, explicitly preserving unfinished stages.

## Resolve a Deviation

1. Distinguish a product defect, a test harness error, and an environment limitation; correct the affected part to meet the existing acceptance criteria and run the necessary targeted check. A failure alone adds no criteria, permanent guardrails, mandatory checks, reviews, or acceptance stage.
2. Route ordinary fixes through the existing code review without reopening the package. If a change to agreed behavior or scope is necessary, return it to the user before implementation; obtain review and approval only for affected substantive decisions, including UI verification where required.

## Verify the Overall Result

1. For one small stage, use its final review and verdict for overall acceptance; otherwise, give the full diff and approved package to a new reviewer under the same code review rules. Return findings to the relevant implementers; the final reviewer checks the corrections.
2. Give the final reviewer the current release notes and implementer reports of differences, and ask them to compare the notes with the verified result and report inaccuracies or omissions to the orchestrator.
3. For product changes, use a short smoke of core functions for overall acceptance and targeted checks for the change's actual effects, following the [verification scope rules](../../design-test-scenarios/SKILL.md#verification-scope). Builds, mocks, and isolated checks confirm only their own boundary, not a real external outcome.
4. Fix failed mandatory checks and obtain the final `ACCEPT`. Changing the agreed mandatory checks requires a user decision.

A docs-only commit, a new reviewer, or a new stage alone does not invalidate product test results or require repeating them.

## Request Final User Acceptance

1. After all stages and the final internal `ACCEPT`, update the release notes in the [CR summary](cr-summary.md) to reflect the verified result and the review findings.
2. Report the completed scope, verdict, actual checks, limitations, links to mediation outcomes, the environment's condition after cleanup, and the result location if it matters for use.
3. In the same handoff, show the full text of the release notes, link the summary, and ask the user to accept the CR result and notes together, even if the plan was already approved.
