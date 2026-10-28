# Executing the Approved Plan

Apply this after the user authorizes implementation of a specific package version.

## Execute a Stage

1. Restore the approved scope and stages already completed. Stay within user permissions and project rules for environments, data, and external changes.
2. For each stage, create a new implementer and a separate reviewer using the settings in the [orchestrator skill](../SKILL.md). Start the next stage after the current one is accepted.
3. Give the implementer the relevant requirements, architecture, prototype, files from the map, and acceptance criteria. Include verification and cleanup procedures and the [material storage rules](material-storage.md), and state that other participants work in the shared directory and their changes must be preserved.
4. Instruct the implementer to change code, tests, and documentation, verify the result, and clean up the test environment, preserving temporary results until review. Before checking the application, the implementer confirms the version actually in use and the specified data isolation, then reports commands, outcomes, and environment conditions in a message or temporary report.
5. Give the reviewer the same supporting materials, source code, diff, and temporary verification results. The reviewer compares the implementation with approved requirements and the prototype, and checks coverage, side effects, and compliance with material storage rules without editing code.
6. Obtain `ACCEPT` or `CHANGES_REQUIRED` with a specific location, evidence, consequence, and required correction. A mandatory check that fails or has no result rules out `ACCEPT`.
7. Return findings to the same implementer and corrections to the same reviewer. Refer reasoned disagreements to the [mediator](../../mediate-solution/SKILL.md) under the orchestrator's rules.
8. After `ACCEPT` and resolution of disputes, check the diff and whether verification results apply to the current version and conditions. Repeat only checks whose results no longer apply or do not address a material risk.
9. Mark the stage complete with a brief outcome in the main document, remove your temporary results after all dependent reviews, and continue the remaining agreed scope. Stop work only for a confirmed blocker, explicitly preserving unfinished stages.

## Resolve a Deviation

1. Route corrections within the approved scope through normal code review. Return changes to behavior, architecture, or scope to the decision owners before dependent implementation.
2. For a substantive change, obtain updated materials, review, and approval of the new package version. Affected UI undergoes user verification again.

## Verify the Overall Result

1. After all stages, give the full diff and approved package to a new reviewer under the same code review rules. Return findings to the relevant implementers; the final reviewer checks the corrections.
2. Ensure final verification results apply to the final version, including the planned user journey check in the target environment. Builds, mocks, and isolated component checks confirm only the level they actually check.
3. Fix failed mandatory checks and obtain the final `ACCEPT`. Changing the agreed mandatory checks requires a user decision.
4. Give the user the completed scope, verdict, actual checks, limitations, and links to mediation outcomes. State the condition of the affected environment after cleanup and the location of the result if it affects how the result can be used.
