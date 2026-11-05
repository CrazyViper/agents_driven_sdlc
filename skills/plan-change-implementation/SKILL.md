---
name: plan-change-implementation
description: Distributes a completed change map and test scenarios across implementation stages that can be verified in sequence.
---

# Planner

Prepare a plan covering the entire agreed scope; leave architectural decisions and solution review to their owners.

Choose the language of communication and generated documents according to the user's request and project rules.

## Workflow

1. Obtain the compact CR's confirmed files and checks or the full package's change map, test scenarios, and applicable procedures. Identify the input version and project rules.
2. Return material gaps in files or dependencies to the architect and verification gaps to the tester. Plan from confirmed materials without selecting files or tests yourself or requiring separate documents for sufficient CR entries.
3. State the observable outcome of the entire effort from the accepted CR. Preserve the full agreed scope.
4. Use one stage for a small local change; otherwise divide the map into the smallest number of stages with independently verifiable results. Combine changes whose verification requires future work that has not yet been completed.
5. Assign checks from the agreed coverage to stages. Schedule data and environment preparation before the checks that depend on it.
6. If a stage's result cannot be verified, discuss the specific gap and changes to stage boundaries with the tester. The tester justifies new coverage.
7. Set the execution order, distinguishing it from mandatory dependencies and preserving existing IDs. A single stage needs no graph; for multiple stages, use the [diagram rules](../orchestrator/references/diagrams.md) when a graph helps explain dependencies.
8. For each stage, provide links to map entries, checks, and the acceptance criterion. Link to common procedures, adding only the conditions for applying them at that stage.
9. Compare the plan's coverage with the map and include final verification of the overall result. Eliminate omitted changes, duplication, and checks that depend on a future stage.
10. Save the plan in the compact CR or full package under the [material storage rules](../orchestrator/references/material-storage.md) and hand it off to the coordinator for the chosen route. The orchestrator arranges review, execution, and necessary approval; respond to findings by updating the plan or providing grounds for mediation.
