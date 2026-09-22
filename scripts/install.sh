#!/usr/bin/env bash

set -euo pipefail

installer_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
repository_dir="$(cd "${installer_dir}/.." && pwd)"
source_skills_dir="${repository_dir}/skills"
target_skills_dir="${AGENTS_SKILLS_DIR:-${HOME}/.agents/skills}"
skill_names=(
  orchestrator
  ux-designer
  define-product-change
  develop-user-scenarios
  design-project-architecture
  design-test-scenarios
  plan-change-implementation
  review-solution
  mediate-solution
)
retired_skill_names=(plan-implement-review)

check_target() {
  local target_path="$1"
  if [[ -e "${target_path}" && ! -L "${target_path}" ]]; then
    echo "Путь уже занят и не является симлинком: ${target_path}" >&2
    exit 1
  fi
}

install_symlink() {
  local source_path="$1"
  local target_path="$2"
  local label="$3"

  # Повторная проверка сохраняет обычный файл при изменении после preflight.
  check_target "${target_path}"
  if [[ -L "${target_path}" ]]; then
    ln -sfn "${source_path}" "${target_path}"
  else
    ln -s "${source_path}" "${target_path}"
  fi
  echo "Установлен ${label}: ${target_path} -> ${source_path}"
}

# Проверить все источники и обычные файлы до изменения пользовательских ссылок.
for skill_name in "${skill_names[@]}"; do
  if [[ ! -f "${source_skills_dir}/${skill_name}/SKILL.md" ]]; then
    echo "Не найден исходный скил: ${skill_name}" >&2
    exit 1
  fi
  check_target "${target_skills_dir}/${skill_name}"
done

for skill_name in "${retired_skill_names[@]}"; do
  check_target "${target_skills_dir}/${skill_name}"
done

mkdir -p "${target_skills_dir}"

for skill_name in "${skill_names[@]}"; do
  install_symlink "${source_skills_dir}/${skill_name}" "${target_skills_dir}/${skill_name}" "скил ${skill_name}"
done

# Удаляется только ссылка на архивный скил. Её целевой каталог сохраняется.
for skill_name in "${retired_skill_names[@]}"; do
  retired_path="${target_skills_dir}/${skill_name}"
  check_target "${retired_path}"
  if [[ -L "${retired_path}" ]]; then
    rm -- "${retired_path}"
    echo "Удалён симлинк архивного скила: ${retired_path}"
  fi
done
