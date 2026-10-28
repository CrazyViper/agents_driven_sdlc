# Diagrams in the Solution Package

Follow the [material storage rules](material-storage.md) for diagrams, visual verification files, and diagnostics.

## Workflow

1. Choose the question the diagram should explain, and show the affected part with the necessary adjacent connections. Reuse a sufficient canonical diagram by linking to it.
2. Use the project format; otherwise, choose an appropriate Mermaid diagram type. Identify the source and distinguish the current state from the target state and assumptions.
3. Label actions, connection directions, and transition conditions with precise project terms. Distinguish domain relationships, component calls, and storage relationships, preserving stable IDs for references.
4. Below the diagram, record only material rationale and constraints that are not visible in it. Keep exact definitions, requirements, and contracts in canonical text or tables with links.
5. Save the `.mmd` source, `.svg` export, and a preview in the designated document unless the project specifies another format. Use relative links and maintain one reproducible export procedure.
6. When a diagram changes, update its source, export, and related explanations. Fix the image through its source or export settings.
7. Trace material paths, compare them with requirements, and check links and export readability in the target viewer. On failure, investigate the cause and an available way to view the diagram; leave mandatory visual verification incomplete if it has no result.
8. Present the current preview or open the document containing it. The reviewer checks the same diagrams and exact rules without creating duplicate materials.
