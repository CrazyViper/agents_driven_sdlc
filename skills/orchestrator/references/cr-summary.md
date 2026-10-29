# CR Summary for Plan Approval

Save the summary under the [material storage rules](material-storage.md) and link it from the CR. Use the following sections in this order and number all lists.

1. **Goal:** explain in one short sentence what problem the CR addresses.
2. **Outcome:** describe the resulting behavior and any new boundary conditions and constraints in the minimum necessary number of short items. If the interface changes, insert one image of the new prototype with the changed areas clearly marked in this section before the outcome list.
3. **Changes:** create a concise but complete nested numbered list: repository, component, change. Describe the substance of each change in one short, informative sentence. A component's only change may be written after its name and a colon.
4. **Stages:** repeat the same change wording in a nested numbered list: stage, component, change. Check that both lists contain the same changes.
5. **Key diagrams:** show an overview diagram and diagrams with changes marked, without a stage diagram.
6. **Test scenarios:** include only a numbered list of the main test scenarios planned for implementation. Describe each scenario in one short sentence in plain language stating exactly what the test will check.
7. **Artifacts:** end the summary with relative links only to the main current CR documents. Do not list supporting files or run materials in the summary.

## Summary Writing Requirements

1. Use plain language that an architect and a product owner can understand.
2. Each sentence must express a concrete idea and have value on its own.
3. Do not use comma-separated lists of nouns or actions.
4. In **Changes** and **Stages**, explicitly mark each new dependency as **New internal dependency** or **New external dependency**. Name the dependent component, the internal component or external library, framework, or service it will depend on, and the purpose of the dependency.
