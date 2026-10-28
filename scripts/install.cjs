#!/usr/bin/env node

const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const bundleName = 'agents_driven_sdlc';
const sourceRoot = path.resolve(__dirname, '..');
const skillNames = [
  'orchestrator',
  'ux-designer',
  'define-product-change',
  'develop-user-scenarios',
  'design-project-architecture',
  'design-test-scenarios',
  'plan-change-implementation',
  'review-solution',
  'mediate-solution',
];

function entryAt(file) {
  try {
    return fs.lstatSync(file);
  } catch (error) {
    if (error.code === 'ENOENT') return null;
    throw error;
  }
}

function requireFile(file) {
  if (!fs.statSync(file, { throwIfNoEntry: false })?.isFile()) {
    throw new Error(`Bundle file not found: ${file}`);
  }
}

function installBundle(source = sourceRoot, destination = process.env.AGENTS_SKILLS_DIR ||
  path.join(os.homedir(), '.agents', 'skills')) {
  source = fs.realpathSync(source);
  for (const name of skillNames) {
    requireFile(path.join(source, 'skills', name, 'SKILL.md'));
  }
  for (const name of ['VERSION', 'LICENSE', 'THIRD_PARTY_NOTICES.md']) {
    requireFile(path.join(source, name));
  }
  const version = fs.readFileSync(path.join(source, 'VERSION'), 'utf8').trim();

  fs.mkdirSync(destination, { recursive: true });
  destination = fs.realpathSync(destination);
  const target = path.join(destination, bundleName);
  const relativeSource = path.relative(target, source);
  if (relativeSource === '' || (relativeSource !== '..' &&
    !relativeSource.startsWith(`..${path.sep}`) && !path.isAbsolute(relativeSource))) {
    throw new Error(`The installation directory contains the source files: ${target}`);
  }

  const installed = entryAt(target);
  if (installed) {
    const marker = path.join(target, '.installed-by');
    if (!installed.isDirectory() || installed.isSymbolicLink() ||
      !entryAt(marker)?.isFile() ||
      fs.readFileSync(marker, 'utf8').trim() !== bundleName) {
      throw new Error(`The path is occupied by unrelated content: ${target}. Move it before installing.`);
    }
  }
  for (const name of skillNames) {
    const conflict = path.join(destination, name);
    if (entryAt(conflict)) {
      throw new Error(`Conflict with another skill: ${conflict}. Move it before installing.`);
    }
  }

  const staging = fs.mkdtempSync(path.join(destination, `.${bundleName}.`));
  const next = path.join(staging, 'next');
  const previous = path.join(staging, 'previous');
  let preserveBackup = false;
  try {
    fs.mkdirSync(next);
    for (const name of skillNames) {
      fs.cpSync(path.join(source, 'skills', name), path.join(next, name), {
        recursive: true,
        dereference: true,
      });
    }
    for (const name of ['VERSION', 'LICENSE']) {
      fs.copyFileSync(path.join(source, name), path.join(next, name));
    }
    const notices = fs.readFileSync(path.join(source, 'THIRD_PARTY_NOTICES.md'), 'utf8');
    fs.writeFileSync(path.join(next, 'THIRD_PARTY_NOTICES.md'), notices.replaceAll('](skills/', ']('));
    fs.writeFileSync(path.join(next, '.installed-by'), `${bundleName}\n`);

    if (installed) fs.renameSync(target, previous);
    fs.renameSync(next, target);
  } catch (error) {
    if (entryAt(previous) && !entryAt(target)) {
      try {
        fs.renameSync(previous, target);
      } catch (restoreError) {
        preserveBackup = true;
        throw new Error(`${error.message}\nFailed to restore the installation: ${restoreError.message}\n` +
          `The backup is preserved at: ${previous}`);
      }
    }
    throw error;
  } finally {
    if (!preserveBackup) fs.rmSync(staging, { recursive: true, force: true });
  }
  return { version, target, count: skillNames.length };
}

function main(args) {
  if (args.length === 1 && ['--help', '-h'].includes(args[0])) {
    console.log('Usage: agents-driven-sdlc [--help | --version]\n\n' +
      'Install the complete skill bundle for the current user.\n' +
      'Default directory: ~/.agents/skills/agents_driven_sdlc/\n' +
      'Set AGENTS_SKILLS_DIR to choose a different parent directory.');
    return;
  }
  if (args.length === 1 && ['--version', '-v'].includes(args[0])) {
    console.log(fs.readFileSync(path.join(sourceRoot, 'VERSION'), 'utf8').trim());
    return;
  }
  if (args.length) {
    throw new Error(`Unknown arguments: ${args.join(' ')}. Run with --help for usage.`);
  }
  const { version, target, count } = installBundle();
  console.log(`Installed bundle ${version}: ${target} (${count} skills)`);
}

if (require.main === module) {
  try {
    main(process.argv.slice(2));
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

module.exports = { installBundle };
