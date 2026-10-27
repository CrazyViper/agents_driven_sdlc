# agents_driven_sdlc

Девять скилов Codex для подготовки и реализации изменений в программном продукте. Общий CR связывает результаты ролей, правила конкретного проекта задают его `AGENTS.md` и документация.

## Порядок работы

UX-макет → верификация пользователем → постановка → сценарии → архитектура → проверки → план → ревью пакета → утверждение пользователем → реализация.

UX-этап применяется при изменении интерфейса, медиация возникает при аргументированном споре. После проектирования проверок архитектор дополняет карту файлов до передачи планировщику.

Общее дерево решений ведётся с UX-этапа и передаётся продакту вместе с макетом. Блокирующий продуктовый вопрос разрешается до проверки зависимого UI; дерево хранится в свободной краткой форме и отдельно не согласуется.

## Скилы

| Скил | Результат |
| --- | --- |
| [orchestrator](skills/orchestrator/SKILL.md) | Координация ролей, утверждение пакета и исполнение плана. |
| [ux-designer](skills/ux-designer/SKILL.md) | Проверенный интерактивный макет и решения пользователя. |
| [define-product-change](skills/define-product-change/SKILL.md) | Цель и границы CR, доменная модель и выбранный подход. |
| [develop-user-scenarios](skills/develop-user-scenarios/SKILL.md) | Сценарии и проверяемые ФТ/НФТ. |
| [design-project-architecture](skills/design-project-architecture/SKILL.md) | Архитектура, контракты и карта конкретных файлов. |
| [design-test-scenarios](skills/design-test-scenarios/SKILL.md) | Покрытие, тестовые сценарии и условия данных и окружения. |
| [plan-change-implementation](skills/plan-change-implementation/SKILL.md) | План последовательно проверяемых этапов. |
| [review-solution](skills/review-solution/SKILL.md) | Вердикт по конкретной версии полного пакета. |
| [mediate-solution](skills/mediate-solution/SKILL.md) | Проверенные основания разногласия и лог его разрешения. |

Правила [диаграмм](skills/orchestrator/references/diagrams.md), [исполнения](skills/orchestrator/references/execution.md) и [медиации](skills/mediate-solution/references/discussion.md) находятся в соответствующих справочниках. Настройки запуска участников заданы в скиле оркестратора.

При работе с решениями используются [дерево](skills/orchestrator/references/decision-tree.md), при уточнении терминов [понятия](skills/define-product-change/references/concepts.md), при труднообратимом архитектурном решении [его запись](skills/design-project-architecture/references/decision-records.md). Эти инструкции подключаются по задаче.

## Использование

Для полного цикла передай идею, контекст и ограничения:

```text
Используй $orchestrator, чтобы подготовить пакет решения по этой идее,
показать его мне на утверждение и реализовать согласованный план: …
```

Для продолжения укажи CR, утверждённую версию и текущий этап. Для отдельного артефакта вызови соответствующий скил напрямую.

## Установка

Разбор решений и понятий входит в комплект. Для UX-показа используются доступные `visualize` и `modern-web-guidance`.

```bash
./scripts/install.sh
```

Скрипт создаёт симлинки девяти скилов в `~/.agents/skills`, не перезаписывая обычные файлы и каталоги. Для другого каталога:

```bash
AGENTS_SKILLS_DIR=/path/to/skills ./scripts/install.sh
```
