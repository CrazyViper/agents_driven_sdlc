#!/usr/bin/env bash

set -euo pipefail

installer_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd -P)"
repository_dir="$(cd "${installer_dir}/.." && pwd -P)"
source_skills_dir="${repository_dir}/skills"
target_skills_dir="${AGENTS_SKILLS_DIR:-${HOME}/.agents/skills}"
bundle_name=agents_driven_sdlc
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
legacy_links=()

fail() {
  echo "$*" >&2
  exit 1
}

# Проверить комплект до изменения установленной версии.
for skill_name in "${skill_names[@]}"; do
  [[ -f "${source_skills_dir}/${skill_name}/SKILL.md" ]] || fail "Не найден исходный скил: ${skill_name}"
done
for file_name in VERSION LICENSE THIRD_PARTY_NOTICES.md; do
  [[ -f "${repository_dir}/${file_name}" ]] || fail "Не найден файл комплекта: ${file_name}"
done

mkdir -p "${target_skills_dir}"
target_skills_dir="$(cd "${target_skills_dir}" && pwd -P)"
target_bundle="${target_skills_dir}/${bundle_name}"

case "${repository_dir}/" in
  "${target_bundle}/"*) fail "Каталог установки содержит исходники: ${target_bundle}" ;;
esac

if [[ -e "${target_bundle}" || -L "${target_bundle}" ]]; then
  [[ -d "${target_bundle}" && ! -L "${target_bundle}" &&
     -f "${target_bundle}/.installed-by" && ! -L "${target_bundle}/.installed-by" &&
     "$(cat "${target_bundle}/.installed-by")" == "${bundle_name}" ]] ||
    fail "Путь занят другим содержимым: ${target_bundle}. Переместите его перед установкой."
fi

is_legacy_bundle_link() {
  local link_path="$1" skill_name="$2" linked_skill linked_parent linked_repo remote_url
  linked_skill="$(readlink "${link_path}")" || return 1
  [[ "${linked_skill}" == /* ]] || linked_skill="${link_path%/*}/${linked_skill}"
  [[ "${linked_skill##*/}" == "${skill_name}" ]] || return 1
  linked_parent="$(cd "$(dirname "${linked_skill}")" 2>/dev/null && pwd -P)" || return 1
  [[ "${linked_parent}" == */skills ]] || return 1
  linked_repo="${linked_parent%/skills}"
  [[ "${linked_repo}" == "${repository_dir}" ]] && return 0
  remote_url="$(git -C "${linked_repo}" config --get remote.origin.url 2>/dev/null)" || return 1
  case "${remote_url}" in
    git@github.com:CrazyViper/agents_driven_sdlc.git|https://github.com/CrazyViper/agents_driven_sdlc.git|https://github.com/CrazyViper/agents_driven_sdlc)
      return 0 ;;
    *) return 1 ;;
  esac
}

# Старые копии и чужие ссылки с теми же именами нельзя удалять автоматически.
for skill_name in "${skill_names[@]}" plan-implement-review; do
  legacy_path="${target_skills_dir}/${skill_name}"
  if [[ -e "${legacy_path}" || -L "${legacy_path}" ]]; then
    if [[ -L "${legacy_path}" ]] && is_legacy_bundle_link "${legacy_path}" "${skill_name}"; then
      legacy_links+=("${legacy_path}")
    else
      fail "Конфликт со старой установкой или другим скилом: ${legacy_path}. Переместите его перед установкой."
    fi
  fi
done

# Сначала подготовить полную копию; временная папка скрыта от поиска скилов.
staging_dir="$(mktemp -d "${target_skills_dir}/.${bundle_name}.XXXXXX")"
cleanup() {
  if [[ -d "${staging_dir}/previous" && ! -e "${target_bundle}" && ! -L "${target_bundle}" ]]; then
    if ! mv "${staging_dir}/previous" "${target_bundle}"; then
      echo "Не удалось восстановить установку. Копия сохранена: ${staging_dir}/previous" >&2
      return
    fi
  fi
  rm -rf -- "${staging_dir}"
}
trap cleanup EXIT
trap 'exit 130' INT
trap 'exit 143' TERM

mkdir "${staging_dir}/next"
for skill_name in "${skill_names[@]}"; do
  cp -RL "${source_skills_dir}/${skill_name}" "${staging_dir}/next/${skill_name}"
done
cp "${repository_dir}/VERSION" "${repository_dir}/LICENSE" "${staging_dir}/next/"
# Скилы в установленной папке лежат непосредственно рядом с уведомлениями.
sed 's|](skills/|](|g' "${repository_dir}/THIRD_PARTY_NOTICES.md" > "${staging_dir}/next/THIRD_PARTY_NOTICES.md"
printf '%s\n' "${bundle_name}" > "${staging_dir}/next/.installed-by"

if [[ -d "${target_bundle}" ]]; then
  mv "${target_bundle}" "${staging_dir}/previous"
fi
mv "${staging_dir}/next" "${target_bundle}"
for legacy_path in "${legacy_links[@]+"${legacy_links[@]}"}"; do
  rm -- "${legacy_path}"
done

echo "Установлен комплект $(cat "${target_bundle}/VERSION"): ${target_bundle} (${#skill_names[@]} скилов)"
