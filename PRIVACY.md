# Privacy Policy for Asymptote

**Last updated:** October 26, 2026

Asymptote ("we", "our", or "the extension") is a free, open-source browser extension and algorithmic intelligence companion for LeetCode. We believe your interview preparation, problem-solving history, notes, and habits belong exclusively to you. This Privacy Policy explains our strict local-first data architecture.

---

## 1. Zero External Telemetry and No Tracking

* **No Analytics or Telemetry:** Asymptote contains zero tracking pixels, zero analytics scripts (e.g., Google Analytics, Mixpanel, PostHog), and zero performance tracking beacons.
* **No Third-Party Transmission:** We never send your browsing activity, visited URLs, session data, problem notes, or solution code to any server owned by us or third parties.
* **No Account Required:** You do not need to create an account, log in, or provide an email address to use Asymptote.

---

## 2. Local-First Device Storage (`chrome.storage.local`)

All user-generated information and metadata are stored 100% locally on your computer using Chrome's sandboxed `chrome.storage.local` API and browser `localStorage`:
* **Solved Problems History:** The list of problems you have marked as solved or synced from LeetCode.
* **Personal Notes & Tags:** Any study notes, solution reflections, or pattern tags you author.
* **Confidence Ratings:** Self-assessed ratings (1–5) and review flags used for your personal spaced-repetition queue.
* **Cached Dataset Shards:** Static algorithmic patterns and problem hints cached on your device for offline access.

Your data remains on your machine and is deleted automatically if you uninstall the extension or clear your browser data.

---

## 3. How LeetCode Account Sync Operates

* When you initiate the optional **Sync with LeetCode** feature, the extension sends a GraphQL query directly from your browser session to `leetcode.com`.
* This request fetches your own public solved submission statistics.
* The response is parsed client-side and saved directly into your local `chrome.storage.local`.
* **No credentials or cookies are transmitted**: We do not store or access your password, session cookies, or payment information.

---

## 4. On-Device AI Tutoring (Gemini Nano)

* If enabled in your browser, conversational Socratic tutoring uses Chrome's built-in **Gemini Nano** (`window.ai` Prompt API).
* The language model runs entirely on your local machine's hardware (CPU/GPU/NPU).
* None of your prompts, questions, or code snippets are transmitted over the internet or used for AI model training.

---

## 5. Over-The-Air (OTA) Static Dataset Updates

* The extension periodically checks for updated problem hint catalogs from our public GitHub repository (`https://raw.githubusercontent.com/RijulSitpure/Asymptote/main/dist-dataset/`).
* These requests only download static JSON files containing problem hints and pattern metadata.
* No personal identifying information or device fingerprints are sent during these static file checks.
* The downloaded JSON data is cryptographically verified using SHA-256 checksums before being cached locally.

---

## 6. Open-Source Transparency

Asymptote is open-source under the MIT License. You can inspect the entire codebase, verify network requests, and audit our data handling practices at:  
👉 **[https://github.com/RijulSitpure/Asymptote](https://github.com/RijulSitpure/Asymptote)**

---

## 7. Contact

If you have questions about this privacy policy or Asymptote's security practices, please open an issue on our GitHub repository or contact:  
**Rijul Sitpure** — `sitpurerijul@gmail.com`
