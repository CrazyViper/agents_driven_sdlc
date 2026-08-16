#!/usr/bin/env bash

set -euo pipefail

installer_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
repository_dir="$(cd "${installer_dir}/.." && pwd)"
source_skills_dir="${repository_dir}/skills"
source_agents_dir="${repository_dir}/agents"
target_skills_dir="${AGENTS_SKILLS_DIR:-${HOME}/.agents/skills}"
target_agents_dir="${CODEX_AGENTS_DIR:-${CODEX_HOME:-${HOME}/.codex}/agents}"
skill_names=(
  develop-user-scenarios
  design-project-architecture
  plan-implement-review
)
agent_names=(
  user-scenario-analyst
)

install_symlink() {
  local source_path="$1"
  local target_path="$2"
  local label="$3"

  if [[ -L "${target_path}" ]]; then
    ln -sfn "${source_path}" "${target_path}"
  elif [[ -e "${target_path}" ]]; then
    echo "Путь уже занят и не является симлинком: ${target_path}" >&2
    exit 1
  else
    ln -s "${source_path}" "${target_path}"
  fi

  echo "Установлен ${label}: ${target_path} -> ${source_path}"
}

mkdir -p "${target_skills_dir}" "${target_agents_dir}"

for skill_name in "${skill_names[@]}"; do
  source_path="${source_skills_dir}/${skill_name}"
  target_path="${target_skills_dir}/${skill_name}"

  if [[ ! -f "${source_path}/SKILL.md" ]]; then
    echo "Не найден исходный скил: ${source_path}" >&2
    exit 1
  fi

  install_symlink "${source_path}" "${target_path}" "скил ${skill_name}"
done

for agent_name in "${agent_names[@]}"; do
  source_path="${source_agents_dir}/${agent_name}.toml"
  target_path="${target_agents_dir}/${agent_name}.toml"

  if [[ ! -f "${source_path}" ]]; then
    echo "Не найден исходный агент: ${source_path}" >&2
    exit 1
  fi

  install_symlink "${source_path}" "${target_path}" "агент ${agent_name}"
done
