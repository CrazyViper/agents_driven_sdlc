# agents_driven_sdlc

Девять скилов Codex для проектирования и реализации изменений в программном продукте.
Общий CR (запрос на изменение) связывает результаты ролей, правила конкретного проекта задают его `AGENTS.md` и документация.

## Быстрый старт

Нужны Git, Bash и настроенный локальный Codex с поддержкой субагентов. Проверь доступность моделей из [настроек оркестратора](skills/orchestrator/SKILL.md#подготовь-работу). Для UI используются `visualize` и `modern-web-guidance`.

Быстрый старт устанавливает текущую ветку `main`.

### 1. Клонируй репозиторий и установи комплект скилов

Выполни в Bash:
```bash
git clone --branch main https://github.com/CrazyViper/agents_driven_sdlc.git &&
cd agents_driven_sdlc &&
bash scripts/install.sh
```
Установщик скопирует девять скилов в `~/.agents/skills/agents_driven_sdlc/` и выведет «Установлен комплект». После успешной установки клон репозитория можно удалить.

### 2. Открой свой проект и запусти оркестратор

Открой свой проект в Codex и напиши в новом чате:

```text
$orchestrator сделай возможность добавлять запись в избранное
```

Подставь свою задачу. Если скил не обнаружен, проверь наличие `~/.agents/skills/agents_driven_sdlc/orchestrator/SKILL.md` и перезапусти Codex.

### 3. Ответь на уточняющие вопросы, утверди сначала макет, потом архитектуру и план, потом прими работу

Оркестратор изучит проект, уточнит задачу, задав ряд вопросов и проведёт её по этапам:

1. Сначала подготовит макет и покажет его тебе на утверждение. Для задач без изменений интерфейса этот этап пропускается.
2. После утверждения макета займётся детальным проектированием и планированием. Покажет подготовленное решение и план реализации на отдельное утверждение.
3. Только после твоего явного утверждения решения и плана выполнит реализацию, проверки и ревью.

Макет и план можно дорабатывать по твоим замечаниям столько, сколько потребуется. К следующему этапу оркестратор перейдёт, когда результат тебя устроит и ты его утвердишь.

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

Правила [диаграмм](skills/orchestrator/references/diagrams.md), [исполнения](skills/orchestrator/references/execution.md) и [медиации](skills/mediate-solution/references/discussion.md) находятся в соответствующих справочниках.

Типы субагентов, модели и уровни рассуждения заданы в таблице «Настройки запуска по умолчанию» в [скиле оркестратора](skills/orchestrator/SKILL.md#подготовь-работу). Измени нужные параметры и повторно запусти `bash scripts/install.sh`.

При работе с вариантами решений используются [дерево](skills/orchestrator/references/decision-tree.md), при уточнении терминов [понятия](skills/define-product-change/references/concepts.md), при труднообратимом архитектурном решении [его запись](skills/design-project-architecture/references/decision-records.md). Эти инструкции подключаются по задаче.

## Версионирование и история изменений
- Единая версия комплекта хранится в [VERSION](VERSION).
- Изменения описаны в [CHANGELOG.md](CHANGELOG.md).
- Правила SemVer и выпуска в [RELEASE.md](RELEASE.md).

## Лицензия
Комплект распространяется по [лицензии MIT](LICENSE). Заимствованные материалы и уведомления об авторстве перечислены в [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
