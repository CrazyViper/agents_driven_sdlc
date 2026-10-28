const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { test } = require('node:test');
const { installBundle } = require('../scripts/install.cjs');

const repository = path.resolve(__dirname, '..');
const bundleName = 'agents_driven_sdlc';

function fixture(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'sdlc-install-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const source = path.join(root, 'source with spaces');
  fs.mkdirSync(source);
  for (const name of ['skills', 'scripts', 'VERSION', 'LICENSE', 'THIRD_PARTY_NOTICES.md']) {
    fs.cpSync(path.join(repository, name), path.join(source, name), { recursive: true });
  }
  const destination = path.join(root, 'user skills');
  const bundle = path.join(destination, bundleName);
  fs.mkdirSync(destination);
  const names = fs.readdirSync(path.join(source, 'skills')).sort();
  return { root, source, destination, bundle, names };
}

function snapshot(root) {
  const result = {};
  function visit(directory) {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const file = path.join(directory, entry.name);
      assert.equal(entry.isSymbolicLink(), false, file);
      if (entry.isDirectory()) visit(file);
      else result[path.relative(root, file)] = fs.readFileSync(file).toString('base64');
    }
  }
  visit(root);
  return result;
}

function assertNoStaging(f) {
  assert.deepEqual(fs.readdirSync(f.destination).filter(name => name.startsWith(`.${bundleName}.`)), []);
}

function runCli(f, args) {
  return spawnSync(process.execPath, [path.join(f.source, 'scripts/install.cjs'), ...args], {
    cwd: f.root,
    env: { ...process.env, AGENTS_SKILLS_DIR: f.destination },
    encoding: 'utf8',
  });
}

function symlinkIfPermitted(target, link, type) {
  try {
    fs.symlinkSync(target, link, type);
    return true;
  } catch (error) {
    // Windows may require Developer Mode or elevation for symlinks.
    if (process.platform === 'win32' && error.code === 'EPERM') return false;
    throw error;
  }
}

test('copied bundle survives source removal and preserves notices and relative links', t => {
  const f = fixture(t);
  const result = installBundle(f.source, f.destination);
  assert.equal(result.count, f.names.length);
  for (const name of f.names) {
    assert.deepEqual(snapshot(path.join(f.bundle, name)), snapshot(path.join(f.source, 'skills', name)));
  }
  for (const name of ['VERSION', 'LICENSE']) {
    assert.deepEqual(fs.readFileSync(path.join(f.bundle, name)), fs.readFileSync(path.join(f.source, name)));
  }
  const notices = fs.readFileSync(path.join(f.source, 'THIRD_PARTY_NOTICES.md'), 'utf8');
  assert.equal(fs.readFileSync(path.join(f.bundle, 'THIRD_PARTY_NOTICES.md'), 'utf8'),
    notices.replaceAll('](skills/', ']('));
  const installed = snapshot(f.bundle);
  fs.rmSync(f.source, { recursive: true });
  assert.deepEqual(snapshot(f.bundle), installed);
  for (const name of Object.keys(installed).filter(name => name.endsWith('.md'))) {
    const document = path.join(f.bundle, name);
    for (const [, link] of fs.readFileSync(document, 'utf8').matchAll(/\]\(([^)]+)\)/g)) {
      if (!link.includes('://') && !link.startsWith('#')) {
        assert.ok(fs.existsSync(path.resolve(path.dirname(document), link.split('#')[0])), `${name}: ${link}`);
      }
    }
  }
  assertNoStaging(f);
});

test('reinstallation, update, and rollback replace the bundle and preserve other skills', t => {
  const f = fixture(t);
  const other = path.join(f.destination, 'other-skill');
  fs.mkdirSync(other);
  fs.writeFileSync(path.join(other, 'SKILL.md'), 'keep me');
  installBundle(f.source, f.destination);
  const original = snapshot(f.bundle);
  installBundle(f.source, f.destination);
  assert.deepEqual(snapshot(f.bundle), original);
  fs.mkdirSync(path.join(f.bundle, 'removed-skill'));
  fs.writeFileSync(path.join(f.bundle, 'removed-skill/SKILL.md'), 'old skill');
  fs.writeFileSync(path.join(f.bundle, 'orchestrator/stale.md'), 'old reference');
  const newer = path.join(f.root, 'new release');
  fs.cpSync(f.source, newer, { recursive: true });
  fs.writeFileSync(path.join(newer, 'VERSION'), '1.1.0\n');
  fs.writeFileSync(path.join(newer, 'skills/orchestrator/new.md'), 'new reference');
  installBundle(newer, f.destination);
  assert.equal(fs.readFileSync(path.join(f.bundle, 'VERSION'), 'utf8'), '1.1.0\n');
  assert.equal(fs.existsSync(path.join(f.bundle, 'removed-skill')), false);
  assert.equal(fs.existsSync(path.join(f.bundle, 'orchestrator/stale.md')), false);
  assert.ok(fs.existsSync(path.join(f.bundle, 'orchestrator/new.md')));
  installBundle(f.source, f.destination);
  assert.deepEqual(snapshot(f.bundle), original);
  assert.equal(fs.readFileSync(path.join(other, 'SKILL.md'), 'utf8'), 'keep me');
  assertNoStaging(f);
});

test('unrelated files, directories, and directory links at the bundle path are preserved', t => {
  const f = fixture(t);
  fs.writeFileSync(f.bundle, 'keep me');
  assert.throws(() => installBundle(f.source, f.destination), /unrelated content/);
  assert.equal(fs.readFileSync(f.bundle, 'utf8'), 'keep me');
  fs.unlinkSync(f.bundle);
  fs.mkdirSync(f.bundle);
  fs.writeFileSync(path.join(f.bundle, 'keep.txt'), 'keep me');
  assert.throws(() => installBundle(f.source, f.destination), /unrelated content/);
  assert.equal(fs.readFileSync(path.join(f.bundle, 'keep.txt'), 'utf8'), 'keep me');
  fs.rmSync(f.bundle, { recursive: true });
  fs.symlinkSync(f.source, f.bundle, process.platform === 'win32' ? 'junction' : 'dir');
  assert.throws(() => installBundle(f.source, f.destination), /unrelated content/);
  assert.ok(fs.lstatSync(f.bundle).isSymbolicLink());
  assert.ok(fs.existsSync(path.join(f.source, 'skills/orchestrator/SKILL.md')));
  assertNoStaging(f);
});

test('a linked ownership marker does not authorize replacing unrelated contents', t => {
  const f = fixture(t);
  fs.mkdirSync(f.bundle);
  const marker = path.join(f.root, 'marker');
  fs.writeFileSync(marker, bundleName);
  fs.writeFileSync(path.join(f.bundle, 'keep.txt'), 'keep me');
  if (!symlinkIfPermitted(marker, path.join(f.bundle, '.installed-by'), 'file')) {
    t.skip('Windows does not permit file symlinks for this account');
    return;
  }
  assert.throws(() => installBundle(f.source, f.destination), /unrelated content/);
  assert.equal(fs.readFileSync(path.join(f.bundle, 'keep.txt'), 'utf8'), 'keep me');
});

test('conflicting skill paths leave the installed bundle unchanged', t => {
  const f = fixture(t);
  installBundle(f.source, f.destination);
  const original = snapshot(f.bundle);
  const conflict = path.join(f.destination, 'orchestrator');
  fs.writeFileSync(conflict, 'keep me');
  assert.throws(() => installBundle(f.source, f.destination), /Conflict with another skill/);
  assert.equal(fs.readFileSync(conflict, 'utf8'), 'keep me');
  fs.unlinkSync(conflict);
  fs.mkdirSync(conflict);
  fs.writeFileSync(path.join(conflict, 'keep.txt'), 'keep me');
  assert.throws(() => installBundle(f.source, f.destination), /Conflict with another skill/);
  assert.equal(fs.readFileSync(path.join(conflict, 'keep.txt'), 'utf8'), 'keep me');
  fs.rmSync(conflict, { recursive: true });
  for (const target of [path.join(f.source, 'skills/orchestrator'), path.join(f.root, 'missing')]) {
    if (!symlinkIfPermitted(target, conflict, 'dir')) continue;
    assert.throws(() => installBundle(f.source, f.destination), /Conflict with another skill/);
    assert.ok(fs.lstatSync(conflict).isSymbolicLink());
    fs.unlinkSync(conflict);
  }
  assert.deepEqual(snapshot(f.bundle), original);
  assertNoStaging(f);
});

test('missing source files and copy failures preserve the installed bundle', t => {
  const f = fixture(t);
  installBundle(f.source, f.destination);
  const original = snapshot(f.bundle);
  const skill = path.join(f.source, 'skills/orchestrator/SKILL.md');
  const content = fs.readFileSync(skill);
  fs.unlinkSync(skill);
  assert.throws(() => installBundle(f.source, f.destination), /Bundle file not found/);
  assert.deepEqual(snapshot(f.bundle), original);
  fs.writeFileSync(skill, content);
  t.mock.method(fs, 'cpSync', () => { throw new Error('copy failed'); });
  assert.throws(() => installBundle(f.source, f.destination), /copy failed/);
  assert.deepEqual(snapshot(f.bundle), original);
  assertNoStaging(f);
});

test('failed replacement restores the previous bundle', t => {
  const f = fixture(t);
  installBundle(f.source, f.destination);
  const original = snapshot(f.bundle);
  const rename = fs.renameSync;
  t.mock.method(fs, 'renameSync', (from, to) => {
    if (path.basename(from) === 'next') throw new Error('replacement failed');
    return rename(from, to);
  });
  assert.throws(() => installBundle(f.source, f.destination), /replacement failed/);
  assert.deepEqual(snapshot(f.bundle), original);
  assertNoStaging(f);
});

test('failed rollback preserves the backup and reports its location', t => {
  const f = fixture(t);
  installBundle(f.source, f.destination);
  const original = snapshot(f.bundle);
  const rename = fs.renameSync;
  t.mock.method(fs, 'renameSync', (from, to) => {
    if (['next', 'previous'].includes(path.basename(from))) throw new Error('rename failed');
    return rename(from, to);
  });
  assert.throws(() => installBundle(f.source, f.destination), /The backup is preserved at:/);
  const staging = fs.readdirSync(f.destination).filter(name => name.startsWith(`.${bundleName}.`));
  assert.equal(staging.length, 1);
  assert.deepEqual(snapshot(path.join(f.destination, staging[0], 'previous')), original);
});

test('installation cannot replace its own source directory', t => {
  const f = fixture(t);
  fs.cpSync(f.source, f.bundle, { recursive: true });
  const original = snapshot(f.bundle);
  assert.throws(() => installBundle(f.bundle, f.destination), /contains the source files/);
  assert.deepEqual(snapshot(f.bundle), original);
  assertNoStaging(f);
});

test('CLI help, version, and invalid arguments never install files', t => {
  const f = fixture(t);
  for (const [args, status, pattern] of [
    [['--help'], 0, /Usage:/],
    [['--version'], 0, `${fs.readFileSync(path.join(f.source, 'VERSION'), 'utf8').trim()}\n`],
    [['--unknown'], 1, /Unknown arguments/],
  ]) {
    const result = runCli(f, args);
    assert.equal(result.status, status, result.stderr);
    if (typeof pattern === 'string') assert.equal(result.stdout, pattern);
    else assert.match(result.stdout + result.stderr, pattern);
    assert.deepEqual(fs.readdirSync(f.destination), []);
  }
});

test('CLI installs from a different working directory and propagates errors', t => {
  const f = fixture(t);
  const result = runCli(f, []);
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /Installed bundle .* \(9 skills\)/);
  const original = snapshot(f.bundle);
  fs.writeFileSync(path.join(f.destination, 'orchestrator'), 'keep me');
  const failure = runCli(f, []);
  assert.equal(failure.status, 1);
  assert.match(failure.stderr, /Conflict with another skill/);
  assert.deepEqual(snapshot(f.bundle), original);
});

test('npm tarball contains the bundle and installs through npx offline', t => {
  assert.ok(process.env.npm_execpath, 'Run the complete suite with npm test');
  const f = fixture(t);
  const npmCli = process.env.npm_execpath;
  const npxCli = path.join(path.dirname(npmCli), 'npx-cli.js');
  const cache = path.join(f.root, 'npm cache');
  const env = { ...process.env, AGENTS_SKILLS_DIR: f.destination };
  const packed = spawnSync(process.execPath, [npmCli, 'pack', '--json', '--offline', '--ignore-scripts',
    '--cache', cache, '--pack-destination', f.root], { cwd: repository, env, encoding: 'utf8' });
  assert.equal(packed.status, 0, packed.stderr);
  const [metadata] = JSON.parse(packed.stdout);
  assert.equal(metadata.version, fs.readFileSync(path.join(repository, 'VERSION'), 'utf8').trim());
  const files = metadata.files.map(file => file.path).sort();
  const expected = [
    'package.json', 'README.md', 'LICENSE', 'VERSION', 'THIRD_PARTY_NOTICES.md',
    'CHANGELOG.md', 'RELEASE.md', 'scripts/install.cjs',
    ...Object.keys(snapshot(path.join(repository, 'skills'))).map(name => `skills/${name.split(path.sep).join('/')}`),
  ].sort();
  assert.deepEqual(files, expected);
  const archive = path.join(f.root, metadata.filename);
  const install = () => {
    const result = spawnSync(process.execPath, [npxCli, '--offline', '--yes', '--cache', cache,
      '--package', archive, 'agents-driven-sdlc'],
      { cwd: f.root, env, encoding: 'utf8' });
    assert.equal(result.status, 0, result.stderr);
    assert.match(result.stdout, /Installed bundle .* \(9 skills\)/);
  };
  install();
  for (const name of f.names) {
    assert.deepEqual(snapshot(path.join(f.bundle, name)), snapshot(path.join(f.source, 'skills', name)));
  }
  const original = snapshot(f.bundle);
  fs.writeFileSync(path.join(f.bundle, 'orchestrator/stale.md'), 'old reference');
  install();
  assert.deepEqual(snapshot(f.bundle), original);
  assertNoStaging(f);
});
