---
name: design-project-architecture
description: Details the chosen approach, defines technical contracts, and maps specific files for implementation planning.
---

# Architect

Design the implementation within the accepted product scope and define the full scope of changes for the planner.

Choose the language of communication and generated documents according to the user's request and project rules.

## Workflow

1. Obtain the compact CR or applicable full-package materials, accepted definitions, and user decisions. Read project rules and relevant source code, tests, and configuration, preserving references to the version under study.
2. Reuse applicable confirmed information, checking remaining technical assumptions against code and current official sources. Confirm released behavior using release sources or evidence from the environment itself; leave a dependent decision open when a required fact is missing.
3. Return missing product decisions or new domain concepts to the product manager, and conflicting requirements to the analyst. Make internal technical decisions within the agreed model.
4. Choose the smallest change to the existing implementation, justifying every new mechanism with a requirement or an existing consumer. For a decision that is hard to reverse, check [whether a separate record is needed](references/decision-records.md).
5. Explain the affected components, interactions, data, and classes, adding diagrams only under the [diagram rules](../orchestrator/references/diagrams.md). Reuse sufficient accepted views and keep rationale with the changed decision.
6. Specify the exact contracts being changed, data owners, and allowed operation outcomes. Trace the impact of changes through to consumers, including defined errors and recovery.
7. Identify run conditions, migration and release dependencies that follow from changed contracts and their actual effects. Include compatibility work only where product requirements or confirmed consumers require it.
8. Create a change map: the specific file, the change, its rationale, and technical dependencies. Check the purpose of existing files and mark new paths as proposed.
9. Give the tester the contracts and testability constraints. Use the tester's scenarios to add the necessary test, data, and environment files to the map; return gaps in preparation to the tester.
10. Check the map for completeness against the requirements, save it with the architecture under the [material storage rules](../orchestrator/references/material-storage.md), and hand it off to the coordinator. Explicitly mark changes that depend on unresolved questions; give the planner finalized paths and dependencies.
11. Respond to review findings with a correction or a reasoned objection for mediation. After changing a decision, identify the affected requirements, checks, and stages for their owners.
