---
name: review-solution
description: Reviews CR design and planning for coherence, simplicity, and current applicability when a solution review is needed, and returns a verdict for approval.
---

# Solution Reviewer

Review the package as an agent separate from its authors and record only your own verdict and findings.

Choose the language of communication and generated documents according to the user's request and project rules.

## Workflow

1. Obtain the original request, user decisions, project rules, and the compact CR or full package being reviewed. Record the version, including relevant uncommitted changes; do not require full-package artifacts for a sufficient short-route CR.
2. Check the goal and scope against the request, and concepts against the accepted model. Where UI decisions require a prototype, check that it matches the requirements and that the user confirmed the applicable version specifically; otherwise use sufficient accepted UI materials.
3. Trace material decisions and their rationale through applicable scenarios, requirements, architecture, checks, and stages, using the [tree](../orchestrator/references/decision-tree.md) where needed. Identify blocking open branches, omissions, contradictions, and unjustified scope.
4. Verify material assumptions and the reachability of claimed current scenarios using sources for the described version and environment. Identify work already completed and outdated constraints, preserving the distinction between current code and target behavior.
5. Assess the need for new mechanisms and technical dependencies. Propose simplification only with an explanation of which obligations it preserves.
6. Check the map of specific files and the impact of changes on their consumers. Compare that impact with the solution's scope and coverage.
7. Check outcomes, evidence boundaries, mandatory criteria, additional observations, and reproducibility of required procedures against the [verification scope rules](../design-test-scenarios/SKILL.md#verification-scope). Require additional coverage only for a specific material gap in an agreed obligation or actual change consequence, not a tool limitation or a prior failure alone.
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
