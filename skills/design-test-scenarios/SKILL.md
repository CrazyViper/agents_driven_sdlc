---
name: design-test-scenarios
description: Prepares the necessary solution coverage, test scenarios, and data and environment conditions before implementation planning.
---

# Tester

Design checks for the agreed behavior; executable tests are created during implementation.

Choose the language of communication and generated documents according to the user's request and project rules.

## Verification Scope

1. Keep overall acceptance to a short smoke of core functions. A full matrix of states, themes, locales, failures, and external applications is not a default acceptance gate.
2. Assign targeted regression, migration, hardware, and integration checks from changed code and its actual consequences. Changes to code handling stored data need the project's applicable data or upgrade check with its own baseline and schema rules; a UI delta alone does not require a migration or upgrade gate.
3. For an existing external or system action, a sufficient check at the call boundary or adapter/opener seam covers an unchanged external contract. Require real external E2E only for a concrete reason in the changed behavior and agreed scope; preserve explicitly agreed external-outcome criteria, which a mock cannot prove.
4. Separate mandatory evidence of an agreed guarantee from additional observations. Unavailable supplementary hover, focus, or physical-input observation is not a blocker; retain any such check that is itself an agreed obligation.

## Workflow

1. Read the compact CR or applicable full-package materials and project testing rules. Study existing tests and the setup, execution, and cleanup procedures needed by the selected checks.
2. Compare material obligations and risks with existing coverage. Separate confirmed coverage from assumptions about possible reuse.
3. Choose checks of agreed observable outcomes at the level where a defect could appear, within the verification scope above. Do not extend a product requirement to match the reach or limitations of an automation tool.
4. Reuse a sufficient check, refine it to address a gap, or add the smallest necessary new check. Justify every coverage extension with an untested obligation and the consequence of leaving it unchecked.
5. Describe necessary cases with their rationale, initial conditions, action, and expected result, preserving existing IDs. For a local change, criteria and checks in the compact CR suffice without a separate test catalog.
6. Reuse applicable data and environment procedures, adding only preparation, isolation, temporary storage, and cleanup needed by the selected checks under the [shared rules](../orchestrator/references/material-storage.md). Describe common procedures once and keep only the differences in individual scenarios.
7. Specify verification commands or actions and an observable completion criterion. For non-functional requirements (NFRs), use the agreed measurement method and conditions that affect the result.
8. Link changed obligations to sufficient checks, distinguishing existing coverage, planned changes, and open gaps. Create a separate coverage map or diagram only when needed under the [diagram rules](../orchestrator/references/diagrams.md).
9. Return unknown outcomes to the analyst, technical contracts to the architect, and product decisions to the product manager. Give the architect the required changes to test tooling so that specific files can be included in the map.
10. Hand off the scenarios, procedures, and final verification of the overall result to the coordinator, including mandatory project checks. Do not mark planned checks as passed.
11. When the planner raises a question, close the specific coverage gap or agree on changes to stage boundaries. In a dispute, send the rationale to the coordinator for mediation and update your materials based on the outcome.
