/**
 * LeetCode Public GraphQL Service
 * Uses Node native fetch to query public endpoints.
 */

const LEETCODE_GRAPHQL_ENDPOINT = 'https://leetcode.com/graphql';

export class LeetCodeService {
  constructor(timeoutMs = 8000) {
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
          'Referer': 'https://leetcode.com'
        },
        body: JSON.stringify({ query, variables }),
        signal: controller.signal
      });

      if (!response.ok) {
        throw new Error(`LeetCode API returned HTTP ${response.status}`);
      }

      const json = await response.json();
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
   */
  async getRecentAcceptedSubmissions(username, limit = 20) {
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

    const data = await this.query(gql, { username, limit });
    return data?.recentAcSubmissionList || [];
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

    const data = await this.query(gql, { titleSlug });
    return data?.question || null;
  }
}
