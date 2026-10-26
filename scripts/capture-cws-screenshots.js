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
        url: 'http://localhost:5173/?tab=solver&q=two-sum&user=alex_dev',
        waitMs: 3000
      },
      {
        name: 'screenshot-2-curriculum-roadmap.png',
        url: 'http://localhost:5173/?tab=roadmap&user=alex_dev',
        waitMs: 3000
      },
      {
        name: 'screenshot-3-patterns-catalog.png',
        url: 'http://localhost:5173/?tab=patterns&user=alex_dev',
        waitMs: 3000
      },
      {
        name: 'screenshot-4-dashboard-overview.png',
        url: 'http://localhost:5173/?tab=dashboard&user=alex_dev',
        waitMs: 3000
      },
      {
        name: 'screenshot-5-review-queue.png',
        url: 'http://localhost:5173/?tab=queue&user=alex_dev',
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

    // 2. Capture Promo Tile (440x280) with authentic Asymptote SVG logo
    console.log('Capturing promo-tile-440x280.png (440x280) with official logo...');
    await sendCdpCommand(ws, 'Emulation.setDeviceMetricsOverride', {
      width: 440,
      height: 280,
      deviceScaleFactor: 1,
      mobile: false
    });

    const promoHtml = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 440px;
    height: 280px;
    background: #f8fafc;
    background-image: 
      linear-gradient(to right, #f1f5f9 1px, transparent 1px),
      linear-gradient(to bottom, #f1f5f9 1px, transparent 1px);
    background-size: 20px 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    overflow: hidden;
  }
  .card {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 16px;
    padding: 24px 28px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    box-shadow: 0 10px 25px -5px rgba(30, 32, 51, 0.05), 0 8px 10px -6px rgba(30, 32, 51, 0.04);
    width: 396px;
  }
  .logo-row {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 6px;
  }
  .logo-svg {
    width: 40px;
    height: 40px;
    flex-shrink: 0;
  }
  .brand-name {
    font-size: 26px;
    font-weight: 800;
    color: #1e2033;
    letter-spacing: -0.5px;
  }
  .tagline {
    font-size: 13px;
    font-weight: 600;
    color: #059669;
    margin-bottom: 10px;
    letter-spacing: -0.1px;
  }
  .desc {
    font-size: 11.5px;
    color: #64748b;
    line-height: 1.5;
    margin-bottom: 14px;
    max-width: 330px;
  }
  .badges {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
    justify-content: center;
  }
  .badge {
    border-radius: 9999px;
    padding: 3px 9px;
    font-size: 10px;
    font-weight: 600;
  }
  .badge-slate {
    background: #f1f5f9;
    border: 1px solid #e2e8f0;
    color: #334155;
  }
  .badge-emerald {
    background: #ecfdf5;
    border: 1px solid #a7f3d0;
    color: #047857;
  }
</style>
</head>
<body>
  <div class="card">
    <div class="logo-row">
      <svg class="logo-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
        <rect width="120" height="120" rx="26" fill="#10b981"/>
        <g transform="translate(-4 4)">
          <path d="M24 100 L53 33 Q60 16 67 33 C73 52 90 98 116 99" stroke="#1e2033" stroke-width="14" fill="none" stroke-linejoin="round" stroke-linecap="round"/>
        </g>
      </svg>
      <span class="brand-name">Asymptote</span>
    </div>
    <div class="tagline">Algorithmic Pattern Intelligence &amp; Socratic Coach</div>
    <div class="desc">Master algorithmic patterns, progressive hints, and complexity limits. 100% private, offline, and free forever.</div>
    <div class="badges">
      <span class="badge badge-emerald">37 Patterns</span>
      <span class="badge badge-slate">100% Offline</span>
      <span class="badge badge-slate">Socratic Hints</span>
      <span class="badge badge-emerald">Zero API Keys</span>
    </div>
  </div>
</body>
</html>`;

    const promoDataUrl = `data:text/html;charset=utf-8,${encodeURIComponent(promoHtml)}`;
    await sendCdpCommand(ws, 'Page.navigate', { url: promoDataUrl });
    await sleep(1500);

    const { data: promoData } = await sendCdpCommand(ws, 'Page.captureScreenshot', {
      format: 'png',
      captureBeyondViewport: false
    });
    const promoBuffer = Buffer.from(promoData, 'base64');
    const promoPath = path.join(OUT_DIR, 'promo-tile-440x280.png');
    fs.writeFileSync(promoPath, promoBuffer);
    console.log(`✓ Saved: ${promoPath} (${(promoBuffer.length / 1024).toFixed(1)} KB)`);

    ws.close();
  } finally {
    chromeProcess.kill();
  }
}

run().catch(console.error);
