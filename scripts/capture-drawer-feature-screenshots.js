import http from 'node:http';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const OUT_DIR = path.resolve(process.cwd(), 'docs', 'screenshots');
fs.mkdirSync(OUT_DIR, { recursive: true });

const ARTIFACT_DIR = '/Users/rijul/.gemini/antigravity/brain/13790683-80d0-41c4-affd-c2d751ade400';

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
      } catch (_e) {}
    };
    ws.addEventListener('message', handler);
    ws.send(JSON.stringify({ id, method, params }));
  });
}

const htmlTemplate = (drawerStyle, customHeaderBadge = '', dragging = false) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>LeetCode - Two Sum with Asymptote 2.1.0</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&family=Space+Grotesk:wght@300..700&display=swap');
    
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: #1a1a1a;
      color: #eff1f6;
      height: 100vh;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }

    /* LeetCode Top Navigation Bar */
    .lc-nav {
      height: 48px;
      background: #282828;
      border-bottom: 1px solid #383838;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 16px;
      font-size: 13px;
      z-index: 50;
    }
    .lc-nav-left { display: flex; align-items: center; gap: 16px; }
    .lc-logo { font-weight: 700; color: #ffa116; font-size: 15px; display: flex; align-items: center; gap: 6px; }
    .lc-nav-crumb { color: #a1a1a1; display: flex; align-items: center; gap: 8px; font-weight: 500; }
    .lc-nav-crumb strong { color: #ffffff; }
    .lc-nav-right { display: flex; align-items: center; gap: 12px; }
    .lc-btn-run { background: #3e3e3e; border: 1px solid #525252; color: #fff; padding: 5px 12px; border-radius: 6px; font-weight: 600; font-size: 12px; cursor: pointer; }
    .lc-btn-submit { background: #2cbb5d; color: #fff; border: none; padding: 5px 14px; border-radius: 6px; font-weight: 700; font-size: 12px; cursor: pointer; }

    /* LeetCode Split Panes */
    .lc-workspace {
      flex: 1;
      display: flex;
      background: #1a1a1a;
      position: relative;
      overflow: hidden;
    }

    /* Left Pane - Problem Description */
    .lc-pane-left {
      width: 48%;
      border-right: 1px solid #333333;
      background: #262626;
      padding: 24px;
      overflow-y: auto;
      font-size: 14px;
      line-height: 1.6;
    }
    .prob-badge { display: inline-block; background: rgba(0, 184, 163, 0.15); color: #00b8a3; padding: 2px 8px; border-radius: 12px; font-size: 12px; font-weight: 600; margin-bottom: 12px; }
    .prob-title { font-size: 20px; font-weight: 700; color: #ffffff; margin-bottom: 12px; font-family: 'Space Grotesk', sans-serif; }
    .prob-statement { color: #d0d0d0; margin-bottom: 20px; }
    .prob-example { background: #1a1a1a; border-radius: 8px; padding: 14px 16px; margin-bottom: 16px; font-family: 'JetBrains Mono', monospace; font-size: 13px; color: #e2e8f0; border-left: 3px solid #ffa116; }

    /* Right Pane - Monaco Editor */
    .lc-pane-right {
      width: 52%;
      background: #1e1e1e;
      display: flex;
      flex-direction: column;
      position: relative;
    }
    .editor-header {
      height: 38px;
      background: #252526;
      border-bottom: 1px solid #333333;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 16px;
      font-size: 12px;
      color: #9cdcfe;
    }
    .editor-body {
      flex: 1;
      padding: 16px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 13.5px;
      line-height: 1.7;
      color: #d4d4d4;
      overflow: hidden;
    }
    .code-kw { color: #569cd6; font-weight: 600; }
    .code-fn { color: #dcdcaa; }
    .code-var { color: #9cdcfe; }
    .code-str { color: #ce9178; }
    .code-comment { color: #6a9955; font-style: italic; }

    /* Asymptote Pill Widget */
    .asymptote-widget-pill {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: #1e2033;
      color: #ffffff;
      border: 1px solid #334155;
      padding: 9px 16px;
      border-radius: 9999px;
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 700;
      font-size: 13px;
      box-shadow: 0 10px 25px -5px rgba(0,0,0,0.4);
      z-index: 1000;
      cursor: pointer;
    }

    /* Asymptote Drawer Panel */
    .drawer-panel {
      position: fixed;
      ${drawerStyle}
      width: 410px;
      max-height: 90vh;
      background-color: #f8fafc;
      background-image: 
        linear-gradient(#e2e8f0 1px, transparent 1px),
        linear-gradient(90deg, #e2e8f0 1px, transparent 1px);
      background-size: 32px 32px;
      border: 1px solid #cbd5e1;
      border-radius: 14px;
      z-index: 2147483647;
      display: flex;
      flex-direction: column;
      color: #1e293b;
      overflow: hidden;
      box-shadow: 0 20px 35px -10px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05);
      ${dragging ? 'box-shadow: 0 25px 50px -12px rgba(0,0,0,0.35), 0 0 0 2px rgba(16,185,129,0.5) !important; cursor: grabbing !important;' : ''}
    }

    .drawer-header {
      padding: 12px 16px;
      border-bottom: 1px solid #e2e8f0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #ffffff;
      cursor: ${dragging ? 'grabbing' : 'grab'};
      user-select: none;
    }
    .drawer-drag-grip {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: ${dragging ? '#10b981' : '#94a3b8'};
      cursor: ${dragging ? 'grabbing' : 'grab'};
      margin-right: 4px;
    }
    .drawer-header:hover .drawer-drag-grip { color: #10b981; }

    .tabs-nav {
      display: flex;
      background: #ffffff;
      border-bottom: 1px solid #e2e8f0;
      padding: 0 8px;
    }
    .tab-btn {
      flex: 1;
      text-align: center;
      padding: 9px 10px;
      font-size: 13px;
      font-weight: 500;
      color: #64748b;
      background: transparent;
      border: none;
      border-bottom: 3px solid transparent;
      cursor: pointer;
    }
    .tab-btn.active {
      color: #0f172a;
      font-weight: 700;
      border-bottom-color: #10b981;
    }

    .drawer-body {
      padding: 16px;
      overflow-y: auto;
      max-height: calc(90vh - 120px);
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .target-badge {
      background: #ecfdf5;
      border: 1px solid #a7f3d0;
      color: #065f46;
      border-radius: 8px;
      padding: 8px 12px;
      font-size: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .target-badge strong { font-weight: 700; }

    .hint-card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      padding: 12px 14px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
    }
    .hint-card.unlocked {
      border-left: 3px solid #10b981;
    }
    .hint-card.locked {
      background: #f8fafc;
      opacity: 0.75;
      border-left: 3px solid #cbd5e1;
    }
    .hint-title {
      font-size: 13px;
      font-weight: 700;
      color: #0f172a;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 6px;
    }
    .hint-desc {
      font-size: 12.5px;
      color: #475569;
      line-height: 1.5;
    }

    .drag-tooltip {
      position: absolute;
      top: -32px;
      left: 16px;
      background: #1e2033;
      color: #fff;
      font-size: 11px;
      font-weight: 600;
      padding: 4px 10px;
      border-radius: 6px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
      white-space: nowrap;
      pointer-events: none;
    }

    .chat-box {
      margin-top: 4px;
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      padding: 10px 12px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .chat-box input {
      border: none;
      outline: none;
      width: 100%;
      font-size: 12px;
      color: #334155;
    }
  </style>
</head>
<body>
  <!-- Top Navigation -->
  <div class="lc-nav">
    <div class="lc-nav-left">
      <div class="lc-logo">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#ffa116"><path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382H10.617z"/></svg>
        <span>LeetCode</span>
      </div>
      <div class="lc-nav-crumb">
        <span>Problem List</span>
        <span>/</span>
        <strong>1. Two Sum</strong>
      </div>
    </div>
    <div class="lc-nav-right">
      <button class="lc-btn-run">▶ Run</button>
      <button class="lc-btn-submit">Submit</button>
      <div style="width:28px; height:28px; border-radius:50%; background:#4a4a4a; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:12px;">RS</div>
    </div>
  </div>

  <!-- Main Split Panes -->
  <div class="lc-workspace">
    <!-- Left: Problem Description -->
    <div class="lc-pane-left">
      <div class="prob-badge">Easy</div>
      <h1 class="prob-title">1. Two Sum</h1>
      <p class="prob-statement">
        Given an array of integers <code>nums</code> and an integer <code>target</code>, return indices of the two numbers such that they add up to <code>target</code>.<br><br>
        You may assume that each input would have <strong>exactly one solution</strong>, and you may not use the same element twice.<br><br>
        You can return the answer in any order.
      </p>
      <div class="prob-example">
        <strong>Example 1:</strong><br>
        Input: nums = [2,7,11,15], target = 9<br>
        Output: [0,1]<br>
        Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
      </div>
      <div class="prob-example">
        <strong>Constraints:</strong><br>
        • 2 &le; nums.length &le; 10<sup>4</sup><br>
        • -10<sup>9</sup> &le; nums[i] &le; 10<sup>9</sup><br>
        • Only one valid answer exists.
      </div>
    </div>

    <!-- Right: Monaco Code Editor -->
    <div class="lc-pane-right">
      <div class="editor-header">
        <span>Python3</span>
        <span>Auto-saved</span>
      </div>
      <div class="editor-body">
<span class="code-kw">class</span> <span class="code-fn">Solution</span>:
    <span class="code-kw">def</span> <span class="code-fn">twoSum</span>(self, <span class="code-var">nums</span>: List[<span class="code-kw">int</span>], <span class="code-var">target</span>: <span class="code-kw">int</span>) -&gt; List[<span class="code-kw">int</span>]:
        <span class="code-comment"># Optimized O(N) Hash Table lookup</span>
        <span class="code-var">seen</span> = {}
        <span class="code-kw">for</span> <span class="code-var">i</span>, <span class="code-var">num</span> <span class="code-kw">in</span> <span class="code-fn">enumerate</span>(<span class="code-var">nums</span>):
            <span class="code-var">complement</span> = <span class="code-var">target</span> - <span class="code-var">num</span>
            <span class="code-kw">if</span> <span class="code-var">complement</span> <span class="code-kw">in</span> <span class="code-var">seen</span>:
                <span class="code-kw">return</span> [<span class="code-var">seen</span>[<span class="code-var">complement</span>], <span class="code-var">i</span>]
            <span class="code-var">seen</span>[<span class="code-var">num</span>] = <span class="code-var">i</span>
        <span class="code-kw">return</span> []
      </div>
    </div>

    <!-- Asymptote Fixed Pill Button at Bottom-Right -->
    <div class="asymptote-widget-pill">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
      <span>Asymptote Coach</span>
    </div>

    <!-- Asymptote Draggable Drawer -->
    <div class="drawer-panel" id="lc-pattern-drawer">
      ${customHeaderBadge}
      <div class="drawer-header" title="Drag to move • Double-click to reset position">
        <div style="display:flex; align-items:center; gap:8px;">
          <span class="drawer-drag-grip" title="Drag to move • Double-click to reset position" aria-label="Drag handle">
            <svg width="10" height="16" viewBox="0 0 10 16" fill="currentColor">
              <circle cx="2.5" cy="2.5" r="1.5" />
              <circle cx="7.5" cy="2.5" r="1.5" />
              <circle cx="2.5" cy="8" r="1.5" />
              <circle cx="7.5" cy="8" r="1.5" />
              <circle cx="2.5" cy="13.5" r="1.5" />
              <circle cx="7.5" cy="13.5" r="1.5" />
            </svg>
          </span>
          <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="7" fill="#1e2033" />
            <path d="M16 6L24 24H20L16 14L12 24H8L16 6Z" fill="#10b981" />
            <circle cx="16" cy="19" r="2.5" fill="#34d399" />
          </svg>
          <span style="font-size:17px; font-weight:700; font-family:'Space Grotesk',sans-serif; color:#1e2033; letter-spacing:-0.02em;">Asymptote</span>
          <span style="background:#e0e7ff; color:#3730a3; font-size:10px; font-weight:700; padding:2px 6px; border-radius:4px;">v2.1.0</span>
        </div>
        <div style="display:flex; align-items:center; gap:6px;">
          <a href="https://github.com/RijulSitpure/Asymptote" style="display:inline-flex; align-items:center; gap:3px; background:#ffffff; color:#854d0e; border:1px solid #fef08a; border-radius:6px; padding:3px 7px; font-size:11px; font-weight:700; text-decoration:none;">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="#eab308" stroke="#eab308" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <span>Star</span>
          </a>
          <button style="display:inline-flex; align-items:center; gap:4px; background:#1e2033; color:#ffffff; border:1px solid #1e2033; border-radius:6px; padding:4px 8px; font-size:11px; font-weight:700; cursor:pointer;">
            <span>Dashboard</span>
          </button>
          <button style="background:none; border:none; color:#64748b; cursor:pointer; padding:4px; line-height:1;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
      </div>

      <!-- Tabs -->
      <div class="tabs-nav">
        <button class="tab-btn active">Hints (2/4)</button>
        <button class="tab-btn">Solution</button>
        <button class="tab-btn">Complexity</button>
        <button class="tab-btn">Notes</button>
      </div>

      <!-- Drawer Body -->
      <div class="drawer-body">
        <div class="target-badge">
          <div>
            <strong>Target Pattern:</strong> Hash Map / Frequency Array
          </div>
          <span style="font-size:11px; font-weight:700; background:#10b981; color:#fff; padding:2px 6px; border-radius:4px;">Optimal: O(N)</span>
        </div>

        <div class="hint-card unlocked">
          <div class="hint-title">
            <span>Hint 1: Recognize the obstacle</span>
            <span style="color:#10b981; font-size:11px;">UNLOCKED</span>
          </div>
          <div class="hint-desc">
            What makes the brute-force approach slow? You are searching for the complement <code>target - nums[i]</code> repeatedly in O(N) time.
          </div>
        </div>

        <div class="hint-card unlocked">
          <div class="hint-title">
            <span>Hint 2: Identify the core insight</span>
            <span style="color:#10b981; font-size:11px;">UNLOCKED</span>
          </div>
          <div class="hint-desc">
            Can you look up complements in O(1) time using an auxiliary frequency map or hash table as you iterate through the list?
          </div>
        </div>

        <div class="hint-card locked">
          <div class="hint-title">
            <span>Hint 3: Outline the procedure</span>
            <span style="color:#94a3b8; font-size:11px;">🔒 LOCKED</span>
          </div>
          <div class="hint-desc">
            Locked until you answer the Socratic prompt or click reveal.
          </div>
        </div>

        <div class="chat-box">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
          <input type="text" placeholder="Ask Asymptote a question about this problem..." />
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;

async function main() {
  console.log('=== Capturing Visual Screenshots of Draggable Extension Drawer ===');

  // Start local HTTP server to host the screenshots
  const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    if (req.url === '/default') {
      // 1. Default position: top 52px, right 20px
      res.end(htmlTemplate('top: 52px; right: 20px;'));
    } else if (req.url === '/dragged') {
      // 2. Dragged position: moved over left pane (left: 60px, top: 70px)
      res.end(htmlTemplate('top: 70px; left: 60px;', '', false));
    } else if (req.url === '/active-drag') {
      // 3. Active dragging with green outline and floating tooltip
      const tooltip = '<div class="drag-tooltip">Dragging • Position auto-persisted</div>';
      res.end(htmlTemplate('top: 70px; left: 60px;', tooltip, true));
    } else {
      res.end('Not found');
    }
  });

  await new Promise(resolve => server.listen(8765, resolve));
  console.log('Test HTTP server listening at http://localhost:8765');

  const chromeProcess = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--disable-gpu',
    '--window-size=1280,800',
    'about:blank'
  ], { stdio: 'ignore' });

  await sleep(1500);

  try {
    const newPageRes = await fetch('http://127.0.0.1:9222/json/new', { method: 'PUT' });
    const pageData = await newPageRes.json();
    const wsUrl = pageData.webSocketDebuggerUrl;
    const ws = new WebSocket(wsUrl);
    await new Promise(res => ws.addEventListener('open', res));

    await sendCdpCommand(ws, 'Page.enable');
    await sendCdpCommand(ws, 'Emulation.setDeviceMetricsOverride', {
      width: 1280,
      height: 800,
      deviceScaleFactor: 2, // HiDPI / Retina quality
      mobile: false
    });

    const captures = [
      {
        url: 'http://localhost:8765/default',
        name: 'drawer-default-top-right.png',
        desc: 'Default drawer position (top: 52px, right: 20px) overlaying right pane'
      },
      {
        url: 'http://localhost:8765/dragged',
        name: 'drawer-dragged-unobstructed-editor.png',
        desc: 'Drawer dragged over left problem description, leaving Monaco code editor completely clear'
      },
      {
        url: 'http://localhost:8765/active-drag',
        name: 'drawer-drag-in-action.png',
        desc: 'Active drag state showing green focus boundary and grip handle'
      }
    ];

    for (const cap of captures) {
      console.log(`Navigating to ${cap.url} for ${cap.name}...`);
      await sendCdpCommand(ws, 'Page.navigate', { url: cap.url });
      await sleep(1000);

      const { data } = await sendCdpCommand(ws, 'Page.captureScreenshot', {
        format: 'png',
        captureBeyondViewport: false
      });

      const buffer = Buffer.from(data, 'base64');
      const outPath = path.join(OUT_DIR, cap.name);
      fs.writeFileSync(outPath, buffer);
      console.log(`✓ Saved ${outPath} (${(buffer.length / 1024).toFixed(1)} KB)`);

      // Also copy to artifact directory for markdown embedding
      const artifactPath = path.join(ARTIFACT_DIR, cap.name);
      fs.writeFileSync(artifactPath, buffer);
      console.log(`✓ Mirrored to artifact dir: ${artifactPath}`);
    }

    // Now capture a close-up crop of the header drag handle affordance in full 1280x800 viewport
    await sendCdpCommand(ws, 'Emulation.setDeviceMetricsOverride', {
      width: 1280,
      height: 800,
      deviceScaleFactor: 2,
      mobile: false
    });
    await sendCdpCommand(ws, 'Page.navigate', { url: 'http://localhost:8765/default' });
    await sleep(800);
    const { data: headerCrop } = await sendCdpCommand(ws, 'Page.captureScreenshot', {
      format: 'png',
      clip: { x: 840, y: 44, width: 430, height: 260, scale: 2 }
    });
    const headerBuffer = Buffer.from(headerCrop, 'base64');
    const headerOut = path.join(OUT_DIR, 'drawer-drag-header-detail.png');
    const headerArtifact = path.join(ARTIFACT_DIR, 'drawer-drag-header-detail.png');
    fs.writeFileSync(headerOut, headerBuffer);
    fs.writeFileSync(headerArtifact, headerBuffer);
    console.log(`✓ Saved header zoom: ${headerOut} (${(headerBuffer.length / 1024).toFixed(1)} KB)`);

    ws.close();
  } finally {
    chromeProcess.kill('SIGTERM');
    server.close();
  }
}

main().catch(err => {
  console.error('Screenshot capture failed:', err);
  process.exit(1);
});
