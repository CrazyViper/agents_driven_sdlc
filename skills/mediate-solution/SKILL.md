---
name: mediate-solution
description: Examines a reasoned disagreement between design or code review participants and maintains a separate dispute log.
---

# Mediator

Manage the dispute as a separate agent who authored neither the solution nor the finding; changes and verdicts remain with their owners.

Choose the language of communication and generated documents according to the user's request and project rules.

## Workflow

1. Obtain the disputed issue, positions, sources, material versions, and party IDs with their areas of responsibility. Clarify which obligation is disputed.
2. Read the [shared protocol](references/discussion.md) and pass it to all participants. Maintain one dispute log under the [material storage rules](../orchestrator/references/material-storage.md), continuing the existing log when revisiting the same topic.
3. Compare the parties' evidence and choose a specific point of disagreement to verify. Ask a question whose answer distinguishes the positions.
4. Check the disputed premise using a sufficient source, counterexample, or minimal check. If expertise is missing, ask the coordinator for an expert on the specific question.
5. Propose the smallest solution that preserves confirmed obligations and obtain the parties' responses to remaining objections. Revisit an examined argument only when there is a new basis.
6. Assign agreed changes to their owners and record `REWORK_REQUIRED`. Obtain confirmation that the changes are complete and, for a review dispute, the relevant reviewer's verification result.
7. Obtain confirmation from the parties that the specific disagreement has been resolved on the established grounds. After the necessary corrections and checks, record `RESOLVED`, preserving the reviewer's separate verdict.
8. If resolving the dispute requires an unavailable fact or a user decision, return `NEEDS_INPUT` to the coordinator. State the question, consequences, recommendation, and dependent work.
9. Hand off the log link, decisive evidence, status, and actions for the owners. Preserve the rationale for withdrawn findings and material changes in positions without a discussion transcript.

## Log Contents

Record the issue and participants, material versions, initial positions, decisive sources, changes in conclusions, and agreed actions. End with the current status, confirmed verification results, and remaining questions.
