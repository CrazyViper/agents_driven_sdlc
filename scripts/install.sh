#!/usr/bin/env bash

set -euo pipefail

installer_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
repository_dir="$(cd "${installer_dir}/.." && pwd)"
source_dir="${repository_dir}/skills"
target_dir="${AGENTS_SKILLS_DIR:-${HOME}/.agents/skills}"
skill_names=(
  design-project-architecture
  plan-implement-review
)

mkdir -p "${target_dir}"

for skill_name in "${skill_names[@]}"; do
  source_path="${source_dir}/${skill_name}"
  target_path="${target_dir}/${skill_name}"

  if [[ ! -f "${source_path}/SKILL.md" ]]; then
    echo "Не найден исходный скил: ${source_path}" >&2
    exit 1
  fi

  if [[ -L "${target_path}" ]]; then
    ln -sfn "${source_path}" "${target_path}"
  elif [[ -e "${target_path}" ]]; then
    echo "Путь уже занят и не является симлинком: ${target_path}" >&2
    exit 1
  else
    ln -s "${source_path}" "${target_path}"
  fi

  echo "Установлен ${skill_name}: ${target_path} -> ${source_path}"
done
