# Shared Decision Tree

Use this when creating, examining, handing off, or reviewing the tree. It connects material decisions for the current change and their dependencies; do not expand the details of excluded alternatives in advance.

## Analysis

1. Find the existing tree; if none exists, start with the goal of the change. UX owns the interface scenario branches, and the product manager continues the same tree; when there is no UI, the product manager starts it.
2. Mark accepted decisions and investigate available facts independently. Agree on material decisions about the goal, scope, behavior, and tradeoffs with the user; route technical decisions to the appropriate role.
3. Gather all questions whose prerequisites are already known into one round, with options, consequences, and recommendations. Defer a question that depends on another open answer or fact until that dependency is resolved.
4. After an answer, record the accepted decision, exclude rejected branches, and expand dependent decision points. Preserve unanswered questions and recompute the ready round without asking for accepted answers again.
5. When a decision changes, revisit nodes that have lost their basis and identify the owners of dependent materials. Unchanged decisions remain valid.
6. Finish a stage after resolving the questions it requires, handing off the others as open. Having no ready questions while waiting for a fact does not mean the stage is complete; separate approval of the tree or the end of the interview is not required.

## Storage and Handoff

1. Save the tree in one canonical location in the CR package under the [material storage rules](material-storage.md); for a standalone prototype before a CR exists, use its description. The format is flexible: a short list with dependencies is sufficient; neither a diagram nor a mandatory set of fields is needed.
2. Save each accepted decision with its rationale and a link to the answer or source; for each open question, identify the unknown and dependent work. Clarify ownership when ambiguous; add stable IDs and links when other materials refer to a node.
3. Save the tree before asking the user questions, pausing, or handing off. Provide the path, package version, relevant nodes, and open questions, and also changed decisions when returning work; the recipient reads the current file.
4. Link concepts, requirements, and contracts to the tree without copying their content. Return new material decisions to their owners; package approval and revision follow the existing process rules.
