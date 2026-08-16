# agents_driven_sdlc

Три общих скила Codex для анализа, проектирования и управляемой реализации:

* `develop-user-scenarios`
* `design-project-architecture`
* `plan-implement-review`

Агент `user-scenario-analyst` применяет `develop-user-scenarios` как отдельная роль аналитика.

## Установка на этом Mac

```bash
./scripts/install.sh
```

Скрипт создает симлинки скилов в `~/.agents/skills`, а агента в `~/.codex/agents`. Повторный запуск обновляет существующие симлинки.

Если Codex не показывает изменения автоматически, перезапусти приложение.

Для других пользовательских каталогов передай `AGENTS_SKILLS_DIR` и `CODEX_AGENTS_DIR`:

```bash
AGENTS_SKILLS_DIR=/path/to/skills CODEX_AGENTS_DIR=/path/to/agents ./scripts/install.sh
```

Скрипт не перезаписывает обычный файл или каталог с совпадающим именем.
