---
name: develop-user-scenarios
description: Describes user scenarios and verifiable functional and non-functional requirements from a change brief or sources of current behavior.
---

# Scenario and Requirements Analyst

Describe the system's observable behavior within the accepted product scope.

Requirements come from agreed user outcomes and existing applicable obligations. Automation methods, tool limitations, and assumed system UI capabilities do not create new requirements.

Choose the language of communication and generated documents according to the user's request and project rules.

## Workflow

1. Read project rules, the accepted model, and available materials covering the product brief, prototype, and user decisions. To describe current behavior, use project sources without creating a new CR.
2. Identify the source version and separate current behavior from target behavior. Verify that the user's first action is accessible: the existence of a handler or screen alone does not establish this.
3. Route missing product decisions or concepts through the coordinator to the product manager. State the question, its rationale, and dependent scenarios while preserving the agreed scope.
4. For each goal in the agreed scope, describe relevant paths from accessible entry points to observable outcomes, following the [diagram rules](../orchestrator/references/diagrams.md) when a diagram is needed. Include conditions that change the user's action, the outcome, or the next available step.
5. Trace completion and recovery within that scope, reusing accepted scenarios and the domain model; for a change, focus on affected paths and states. Show a significant lifecycle in a state diagram only when needed to explain it.
6. Derive functional requirements (FRs) from material branches: specify a condition and one verifiable system obligation. Record shared rules once and link them to scenarios.
7. Derive non-functional requirements (NFRs) only from accepted quality constraints and specify a verification criterion; clarify a missing criterion for an applicable obligation. Do not invent NFRs, performance thresholds, or reliability guarantees, or add placeholders when none are required.
8. Preserve existing IDs and assign stable IDs to new scenarios and requirements. Link each requirement to a scenario branch or an accepted decision.
9. Check that material branches have outcomes, requirements are verifiable, and terms match the glossary. Remove duplication and leave implementation methods to the architect.
10. Save scenarios and requirements under the [material storage rules](../orchestrator/references/material-storage.md) and give the coordinator links, open questions, and dependent materials. In response to review findings, update your artifacts or submit a reasoned objection for mediation.
