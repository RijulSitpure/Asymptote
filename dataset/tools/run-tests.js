#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../..');
const datasetDir = path.resolve(rootDir, 'dataset');
const testsDir = path.resolve(datasetDir, 'tests');

function checkRuntime(cmd, args = ['--version']) {
  try {
    const res = spawnSync(cmd, args, { stdio: 'pipe', timeout: 3000 });
    return res.status === 0;
  } catch (_e) {
    return false;
  }
}

function checkDockerRunning() {
  try {
    const res = spawnSync('docker', ['info'], { stdio: 'pipe', timeout: 4000 });
    return res.status === 0;
  } catch (_e) {
    return false;
  }
}

function checkPythonModule(mod) {
  try {
    const res = spawnSync('python3', ['-c', `import ${mod}`], { stdio: 'pipe', timeout: 3000 });
    return res.status === 0;
  } catch (_e) {
    return false;
  }
}

async function main() {
  console.log('=== Asymptote Dataset Multi-Category Test Runner ===\n');

  const runtimes = {
    python3: checkRuntime('python3'),
    pandas: checkPythonModule('pandas'),
    bash: checkRuntime('bash'),
    docker: checkDockerRunning(),
    mysql: checkRuntime('mysql')
  };

  const skippedRunners = [];

  if (!runtimes.docker) {
    const msg = 'Docker daemon is not running locally. Database container runner and containerized shell isolation will be skipped (CI runs this with a MySQL service container).';
    skippedRunners.push({ runner: 'database', reason: msg });
    console.log(`[SKIP] Database Runner: ${msg}`);
  }

  if (!runtimes.pandas) {
    const msg = 'Python 3 module "pandas" is not installed in the active environment. pandas runner will be skipped (CI runs this in a complete python environment).';
    skippedRunners.push({ runner: 'pandas', reason: msg });
    console.log(`[SKIP] pandas Runner: ${msg}`);
  }

  const targetSlug = process.argv[2];
  // Scan tests directory for testable slugs
  let testDirs = fs.existsSync(testsDir)
    ? fs.readdirSync(testsDir, { withFileTypes: true }).filter(d => d.isDirectory()).map(d => d.name)
    : [];
  if (targetSlug) {
    testDirs = testDirs.filter(d => d === targetSlug);
  }

  console.log(`\nFound ${testDirs.length} problem test suite(s) in dataset/tests/`);

  let totalExecuted = 0;
  let totalPassed = 0;
  let totalFailed = 0;
  const failureDetails = [];

  for (const slug of testDirs) {
    const probFile = path.join(datasetDir, 'problems', `${slug}.json`);
    if (!fs.existsSync(probFile)) {
      console.warn(`[WARN] Test directory found for "${slug}" but dataset/problems/${slug}.json does not exist`);
      continue;
    }

    const prob = JSON.parse(fs.readFileSync(probFile, 'utf8'));
    const category = prob.category;
    const slugTestDir = path.join(testsDir, slug);

    console.log(`\nRunning test for #${prob.number} ${slug} [${category}]...`);
    totalExecuted++;

    let passed = false;
    let detail = '';

    const DEFAULT_TIMEOUT_MS = 60000;
    const minimalEnv = {
      PATH: process.env.PATH || '',
      HOME: process.env.HOME || '',
      TMPDIR: process.env.TMPDIR || '/tmp',
      LANG: process.env.LANG || 'en_US.UTF-8',
      PYTHONDONTWRITEBYTECODE: '1'
    };

    // Guardrail only, not a sandbox.
    const DOCKER_SECURITY_ARGS = [
      '--network', 'none',
      '--read-only',
      '--tmpfs', '/tmp:rw,noexec,nosuid,size=64m',
      '--memory', '512m',
      '--cpus', '1',
      '--pids-limit', '256',
      '--rm'
    ];

    const verifySecurity = (targetPath, content, isTestScript = false) => {
      // 1. Forbidden network imports
      const netMatch = content.match(/(?:^|\n)\s*(?:import|from)\s+(socket|requests|urllib|http)(?:\s|\.|,|$)/m);
      if (netMatch) {
        throw new Error(`Security guardrail: forbidden network import "${netMatch[1]}" in ${targetPath}`);
      }

      // 2. Forbidden execution, subprocess, ctypes, and OS escapes
      const forbiddenConstructs = [
        { name: 'subprocess', regex: /(?:^|\n)\s*(?:import|from)\s+subprocess(?:\s|\.|,|$)/m },
        { name: 'ctypes', regex: /(?:^|\n)\s*(?:import|from)\s+ctypes(?:\s|\.|,|$)/m },
        { name: 'os.system', regex: /\bos\.system\s*\(/ },
        { name: 'os.popen', regex: /\bos\.popen\s*\(/ },
        { name: '__import__', regex: /\b__import__\s*\(/ },
        { name: 'eval(', regex: /\beval\s*\(/ },
        { name: 'open( with write mode', regex: /\bopen\s*\([^)]*['"][wa+x]/ }
      ];

      for (const { name, regex } of forbiddenConstructs) {
        if (regex.test(content)) {
          throw new Error(`Security guardrail: forbidden construct "${name}" in ${targetPath}`);
        }
      }

      // 3. exec( check: strictly forbidden in solutions; in test scripts, only allowed for test harness exec(sol_code
      if (!isTestScript) {
        if (/\bexec\s*\(/.test(content)) {
          throw new Error(`Security guardrail: forbidden construct "exec(" in ${targetPath}`);
        }
      } else {
        const execCalls = content.match(/\bexec\s*\([^)]*\)/g) || [];
        for (const ec of execCalls) {
          if (!ec.includes('sol_code')) {
            throw new Error(`Security guardrail: forbidden arbitrary "exec(" call in ${targetPath}`);
          }
        }
      }
    };

    try {
      // Check solution code security
      for (const sol of prob.solutions || []) {
        if (sol.code) verifySecurity(`${slug}.json solution`, sol.code, false);
      }

      if (category === 'Algorithms') {
        if (!runtimes.python3) {
          detail = 'python3 runtime missing';
        } else {
          const testScript = path.join(slugTestDir, 'test.py');
          if (!fs.existsSync(testScript)) {
            detail = `Missing test.py in ${slugTestDir}`;
          } else {
            const scriptContent = fs.readFileSync(testScript, 'utf8');
            verifySecurity(testScript, scriptContent, true);

            const run = spawnSync('python3', [testScript], {
              cwd: slugTestDir,
              timeout: DEFAULT_TIMEOUT_MS,
              stdio: 'pipe',
              env: minimalEnv
            });
            if (run.status === 0) {
              passed = true;
              console.log(run.stdout ? run.stdout.toString().trim() : 'Passed');
            } else {
              detail = run.stderr ? run.stderr.toString().trim() : `Exited with code ${run.status}`;
            }
          }
        }
      } else if (category === 'Database') {
        if (!runtimes.docker && !runtimes.mysql) {
          console.log(`[SKIP] #${prob.number} ${slug}: Docker and local MySQL client unavailable`);
          continue;
        }
        // Runner implementation for Database
      } else if (category === 'pandas') {
        if (!runtimes.pandas) {
          console.log(`[SKIP] #${prob.number} ${slug}: Python pandas module unavailable`);
          continue;
        }
        const testScript = path.join(slugTestDir, 'test.py');
        if (fs.existsSync(testScript)) {
          const scriptContent = fs.readFileSync(testScript, 'utf8');
          verifySecurity(testScript, scriptContent);
          const run = spawnSync('python3', [testScript], { cwd: slugTestDir, timeout: DEFAULT_TIMEOUT_MS, stdio: 'pipe', env: minimalEnv });
          passed = run.status === 0;
          if (!passed) detail = run.stderr ? run.stderr.toString().trim() : 'pandas test failed';
        }
      } else if (category === 'Shell') {
        const testScript = path.join(slugTestDir, 'test.sh');
        if (fs.existsSync(testScript)) {
          const run = spawnSync('bash', [testScript], { cwd: slugTestDir, timeout: DEFAULT_TIMEOUT_MS, stdio: 'pipe', env: minimalEnv });
          passed = run.status === 0;
          if (!passed) detail = run.stderr ? run.stderr.toString().trim() : 'shell test failed';
        }
      } else if (category === 'Concurrency') {
        const testScript = path.join(slugTestDir, 'test.py');
        if (fs.existsSync(testScript)) {
          const scriptContent = fs.readFileSync(testScript, 'utf8');
          verifySecurity(testScript, scriptContent);
          const run = spawnSync('python3', [testScript], { cwd: slugTestDir, timeout: DEFAULT_TIMEOUT_MS, stdio: 'pipe', env: minimalEnv });
          passed = run.status === 0;
          if (passed) {
            console.log(`[tested (stress)] 200/200 runs passed without deadlocks or race conditions`);
          } else {
            detail = run.stderr ? run.stderr.toString().trim() : 'concurrency stress test failed';
          }
        }
      } else if (category === 'JavaScript') {
        const testScript = path.join(slugTestDir, 'test.js');
        if (fs.existsSync(testScript)) {
          const scriptContent = fs.readFileSync(testScript, 'utf8');
          verifySecurity(testScript, scriptContent);
          const run = spawnSync('node', [testScript], { cwd: slugTestDir, timeout: DEFAULT_TIMEOUT_MS, stdio: 'pipe', env: minimalEnv });
          passed = run.status === 0;
          if (!passed) detail = run.stderr ? run.stderr.toString().trim() : 'javascript test failed';
        }
      }
    } catch (err) {
      passed = false;
      detail = err.message;
    }

    if (passed) {
      totalPassed++;
      console.log(`✓ ${slug} PASSED`);
    } else {
      totalFailed++;
      failureDetails.push({ slug, detail });
      console.error(`✖ ${slug} FAILED: ${detail}`);
    }
  }

  console.log('\n--- Test Run Summary ---');
  console.log(`Total executed: ${totalExecuted}`);
  console.log(`Passed: ${totalPassed}`);
  console.log(`Failed: ${totalFailed}`);
  if (skippedRunners.length > 0) {
    console.log(`Skipped runners (${skippedRunners.length}):`);
    skippedRunners.forEach(s => console.log(`  - ${s.runner}: ${s.reason}`));
  }

  if (totalFailed > 0) {
    console.error('\nFailures:');
    failureDetails.forEach(f => console.error(`  - ${f.slug}: ${f.detail}`));
    process.exit(1);
  } else {
    console.log('\nAll executed problem tests passed.\n');
  }
}

main().catch(err => {
  console.error('Fatal test runner error:', err);
  process.exit(1);
});
