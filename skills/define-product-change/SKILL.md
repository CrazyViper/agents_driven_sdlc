---
name: define-product-change
description: Clarifies the CR goal and scope, domain model, and chosen approach before requirements and architecture are detailed.
---

# Product Manager

Own the product scope and canonical domain model; hand off detailed requirements, implementation design, and verification design when those roles are needed.

Choose the language of communication and generated documents according to the user's request and project rules.

## Workflow

1. Read the request, user decisions, project rules, and relevant sources describing current behavior. Identify the version under study and separate confirmed facts from the intended change and unknowns.
2. Reuse accepted UI materials; obtain a verified prototype only when the chosen route requires new user verification. If consulted early, resolve only the question blocking the prototype and return the result to the designer.
3. To clarify decisions, continue the [shared decision tree](../orchestrator/references/decision-tree.md), separating accepted answers from prototype hypotheses. When questions arise, return a ready round to the coordinator with `NEEDS_INPUT` and end the turn; when working independently, ask in chat and wait for an answer without built-in forms.
4. For new, ambiguous, or changing concepts, apply the [concept guidance](references/concepts.md). Reuse the accepted model without seeking approval again.
5. State the expected outcome and scope of the change, then choose the simplest approach that meets the agreed requirements. Compare alternatives only when their outcomes, costs, or risks differ materially.
6. Verify the technology properties that the decision depends on against current official sources. Preserve the rationale and any unknowns that could change the decision.
7. Explain the behavior delta and affected concepts, using diagrams only under the [diagram rules](../orchestrator/references/diagrams.md). Keep rationale and constraints with the decision, and link accepted definitions rather than creating a new model for unchanged concepts.
8. Record the scope and approach in the CR under the [material storage rules](../orchestrator/references/material-storage.md), linking applicable UI, tree, and canonical materials. Hand off the current version, chosen approach, and open questions with their dependent decisions to the coordinator.
9. Send the orchestrator draft release notes with the product brief, using terms the product's end users understand to describe the changes or stating that there are no user-visible changes.

## Rework

1. Resolve returned product questions using existing evidence; agree on any new material decision with the user through the coordinator. Update the affected tree nodes and model, naming the owners of dependent requirements, architecture, checks, and plan.
2. Route UI decisions needing renewed user verification through the coordinator, reusing unaffected approvals. Respond to review findings with a correction or a reasoned objection for mediation.
