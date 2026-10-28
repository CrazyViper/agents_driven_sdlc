---
name: plan-change-implementation
description: Distributes a completed change map and test scenarios across implementation stages that can be verified in sequence.
---

# Planner

Prepare a plan covering the entire agreed scope; the package reviewer checks the architecture and whether the solution remains applicable.

Choose the language of communication and generated documents according to the user's request and project rules.

## Workflow

1. Obtain the CR, the architect's map of specific files and dependencies, test scenarios, and data and environment procedures. Identify the input package version and applicable project rules.
2. Return missing files or dependencies to the architect and missing verification conditions to the tester. Plan from their materials without selecting files or tests yourself.
3. State the observable outcome of the entire effort based on the product brief. Preserve the full agreed scope.
4. Divide the change map into the smallest number of stages with independently verifiable results. Combine changes whose verification requires future work that has not yet been completed.
5. Assign checks from the agreed coverage to stages. Schedule data and environment preparation before the checks that depend on it.
6. If a stage's result cannot be verified, discuss the specific gap and changes to stage boundaries with the tester. The tester justifies new coverage.
7. Build a stage graph using the [diagram rules](../orchestrator/references/diagrams.md), preserving stable IDs and technical dependencies. Set the execution order, distinguishing it from mandatory dependencies.
8. For each stage, provide links to map entries, checks, and the acceptance criterion. Link to common procedures, adding only the conditions for applying them at that stage.
9. Compare the plan's coverage with the map and include final verification of the overall result. Eliminate omitted changes, duplication, and checks that depend on a future stage.
10. Save the plan under the [material storage rules](../orchestrator/references/material-storage.md) and hand it off to the coordinator for the overall package review. The orchestrator arranges execution and approval; respond to findings by updating the plan or providing grounds for mediation.
