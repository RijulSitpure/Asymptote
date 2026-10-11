/**
 * LeetCode Public Service with Fallback Mirrors & Robust Error Handling
 */

const LEETCODE_GRAPHQL_ENDPOINT = 'https://leetcode.com/graphql/';

export class LeetCodeService {
  constructor(timeoutMs = 6000) {
    this.timeoutMs = timeoutMs;
  }

  async query(query, variables = {}) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.timeoutMs);

    try {
      const response = await fetch(LEETCODE_GRAPHQL_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Referer': 'https://leetcode.com',
          'Origin': 'https://leetcode.com'
        },
        body: JSON.stringify({ query, variables }),
        signal: controller.signal
      });

      const text = await response.text();
      if (!text || text.trim().startsWith('<')) {
        throw new Error(`LeetCode Cloudflare protection returned HTML (HTTP ${response.status})`);
      }

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      let json;
      try {
        json = JSON.parse(text);
      } catch (err) {
        throw new Error(`LeetCode returned non-JSON response (HTTP ${response.status})`);
      }

      if (json.errors) {
        throw new Error(json.errors[0]?.message || 'GraphQL Error');
      }
      return json.data;
    } finally {
      clearTimeout(timeout);
    }
  }

  /**
   * Fetch recent accepted submissions for a public user profile
   * Includes fallback mirrors if direct LeetCode connection is blocked by Cloudflare/DNS
   */
  async getRecentAcceptedSubmissions(username, limit = 20) {
    const cleanUser = username.trim();

    // 1. Try Direct GraphQL
    try {
      const gql = `
        query recentAcSubmissions($username: String!, $limit: Int!) {
          recentAcSubmissionList(username: $username, limit: $limit) {
            id
            title
            titleSlug
            timestamp
          }
        }
      `;
      const data = await this.query(gql, { username: cleanUser, limit });
      if (data?.recentAcSubmissionList?.length) {
        return data.recentAcSubmissionList;
      }
    } catch (err) {
      console.warn(`Direct LeetCode GraphQL fetch failed (${err.message}). Trying public mirror...`);
    }

    // 2. Try Public Mirror 1 (Alfa LeetCode API)
    try {
      const mirrorRes = await fetch(`https://alfa-leetcode-api.onrender.com/${cleanUser}/acSubmission?limit=${limit}`, {
        headers: { 'User-Agent': 'Mozilla/5.0' },
        signal: AbortSignal.timeout(5000)
      });
      const text1 = await mirrorRes.text();
      if (mirrorRes.ok && text1 && !text1.trim().startsWith('<')) {
        const mirrorData = JSON.parse(text1);
        const list = mirrorData?.submission || mirrorData?.recentAcSubmissionList || [];
        if (list.length > 0) {
          return list.map(item => ({
            id: item.id || item.submission_id,
            title: item.title,
            titleSlug: item.titleSlug,
            timestamp: item.timestamp
          }));
        }
      }
    } catch (e) {
      // Mirror 1 failed
    }

    // 3. Try Public Mirror 2
    try {
      const mirror2Res = await fetch(`https://leetcode-api-faisalshohag.vercel.app/${cleanUser}`, {
        headers: { 'User-Agent': 'Mozilla/5.0' },
        signal: AbortSignal.timeout(5000)
      });
      const text2 = await mirror2Res.text();
      if (mirror2Res.ok && text2 && !text2.trim().startsWith('<')) {
        const mirror2Data = JSON.parse(text2);
        const list = mirror2Data?.recentSubmissions || [];
        const accepted = list.filter(s => s.statusDisplay === 'Accepted');
        if (accepted.length > 0) {
          return accepted.map(item => ({
            id: item.id || item.titleSlug,
            title: item.title,
            titleSlug: item.titleSlug,
            timestamp: item.timestamp
          }));
        }
      }
    } catch (e) {
      // Mirror 2 failed
    }

    throw new Error(
      `Cannot connect to LeetCode from Node server (Cloudflare / network restriction). ` +
      `Please use the Companion Chrome Extension (1-click sync from active browser session) or the Quick-Paste Import box in the Web App!`
    );
  }

  /**
   * Fetch detailed problem data by slug
   */
  async getQuestionDetails(titleSlug) {
    const gql = `
      query questionData($titleSlug: String!) {
        question(titleSlug: $titleSlug) {
          questionId
          questionFrontendId
          title
          titleSlug
          content
          difficulty
          topicTags {
            name
            slug
          }
          hints
        }
      }
    `;

    try {
      const data = await this.query(gql, { titleSlug });
      return data?.question || null;
    } catch (err) {
      return null;
    }
  }
}
