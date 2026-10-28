---
name: review-solution
description: Reviews the complete CR package after planning for coherence, simplicity, and current applicability, and returns a verdict for approval.
---

# Solution Reviewer

Review the package as an agent separate from its authors and record only your own verdict and findings.

Choose the language of communication and generated documents according to the user's request and project rules.

## Workflow

1. Obtain the original request, user decisions, project rules, and the full package with its plan. Record the version being reviewed, including relevant uncommitted changes.
2. Check the goal and scope against the request, and concepts against the canonical model. For changed UI, check that the prototype matches the requirements and that the user confirmed the applicable version specifically.
3. Trace material decisions from the [tree](../orchestrator/references/decision-tree.md) and their rationale through scenarios, requirements, and architecture to checks and stages. Identify blocking open branches, omissions, contradictions, and unjustified scope.
4. Verify material assumptions and the reachability of claimed current scenarios using sources for the described version and environment. Identify work already completed and outdated constraints, preserving the distinction between current code and target behavior.
5. Assess the need for new mechanisms and technical dependencies. Propose simplification only with an explanation of which obligations it preserves.
6. Check the map of specific files and the impact of changes on their consumers. Compare that impact with the solution's scope and coverage.
7. Check that scenarios verify the required outcome under the relevant conditions, and that data, setup, and cleanup are reproducible. Require additional coverage only for a specific material gap.
8. Compare the plan with the map: the entire scope is included, dependencies are respected, and stages can be verified without future work. Check that final verification of the overall result is included.
9. Check diagrams, their rendering, and explanations against the [diagram rules](../orchestrator/references/diagrams.md), and check compliance with the [material storage rules](../orchestrator/references/material-storage.md). Return gaps in meaning, duplication, and temporary materials included in permanent documents or the diff to their owners.
10. For each finding, identify the specific passage, violated obligation, evidence, consequence, and owner of the correction. Distinguish a demonstrated defect from a question or personal preference.
11. Send findings through the coordinator and review the corrected parts and dependent connections. In a reasoned dispute, request a separate [mediator](../mediate-solution/SKILL.md), retaining responsibility for your verdict.
12. Record the status for the reviewed version, material rationale, and open limitations. Give the coordinator the verdict with links to materials and mediation logs.

## Statuses

- `ACCEPT`: mandatory checks of the materials are complete, with no material open findings or blocking questions.
- `CHANGES_REQUIRED`: state demonstrated defects and specific corrections.
- `NEEDS_INPUT`: state the unavailable fact or required decision, the owner of the answer, and dependent work.

`ACCEPT` applies to the reviewed package version and does not authorize implementation; the orchestrator obtains that authorization.
