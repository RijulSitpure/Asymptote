import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const OUT_DIR = path.resolve(process.cwd(), 'docs', 'screenshots');
fs.mkdirSync(OUT_DIR, { recursive: true });

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function sendCdpCommand(ws, method, params = {}) {
  return new Promise((resolve, reject) => {
    const id = Math.floor(Math.random() * 1000000);
    const handler = (event) => {
      try {
        const msg = JSON.parse(event.data);
        if (msg.id === id) {
          ws.removeEventListener('message', handler);
          if (msg.error) reject(new Error(msg.error.message));
          else resolve(msg.result);
        }
      } catch (_e) {
        // Ignore parse error
      }
    };
    ws.addEventListener('message', handler);
    ws.send(JSON.stringify({ id, method, params }));
  });
}

async function run() {
  console.log('=== Starting Chrome Headless CDP for CWS Screenshots ===');
  const chromeProcess = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--disable-gpu',
    '--window-size=1280,800',
    'about:blank'
  ], { stdio: 'ignore' });

  await sleep(1500);

  try {
    // 1. Fetch browser version & new page
    const newPageRes = await fetch('http://127.0.0.1:9222/json/new', { method: 'PUT' });
    const pageData = await newPageRes.json();
    const wsUrl = pageData.webSocketDebuggerUrl;
    console.log('Connected to Chrome page target:', wsUrl);

    const ws = new WebSocket(wsUrl);
    await new Promise(res => ws.addEventListener('open', res));

    await sendCdpCommand(ws, 'Page.enable');
    await sendCdpCommand(ws, 'Emulation.setDeviceMetricsOverride', {
      width: 1280,
      height: 800,
      deviceScaleFactor: 1,
      mobile: false
    });

    const shots = [
      {
        name: 'screenshot-1-socratic-mentor-solver.png',
        url: 'http://localhost:5173/?tab=solver&q=two-sum',
        waitMs: 3000
      },
      {
        name: 'screenshot-2-curriculum-roadmap.png',
        url: 'http://localhost:5173/?tab=roadmap',
        waitMs: 3000
      },
      {
        name: 'screenshot-3-patterns-catalog.png',
        url: 'http://localhost:5173/?tab=patterns',
        waitMs: 3000
      },
      {
        name: 'screenshot-4-dashboard-overview.png',
        url: 'http://localhost:5173/?tab=dashboard',
        waitMs: 3000
      },
      {
        name: 'screenshot-5-review-queue.png',
        url: 'http://localhost:5173/?tab=queue',
        waitMs: 3000
      }
    ];

    for (const shot of shots) {
      console.log(`Navigating to ${shot.url}...`);
      await sendCdpCommand(ws, 'Page.navigate', { url: shot.url });
      await sleep(shot.waitMs);

      console.log(`Capturing ${shot.name} (1280x800)...`);
      const { data } = await sendCdpCommand(ws, 'Page.captureScreenshot', {
        format: 'png',
        captureBeyondViewport: false
      });

      const buffer = Buffer.from(data, 'base64');
      const outPath = path.join(OUT_DIR, shot.name);
      fs.writeFileSync(outPath, buffer);
      console.log(`✓ Saved: ${outPath} (${(buffer.length / 1024).toFixed(1)} KB)`);
    }

    ws.close();
  } finally {
    chromeProcess.kill();
  }
}

run().catch(console.error);
