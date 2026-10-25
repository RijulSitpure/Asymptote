from collections import deque

class Solution:
    def largestPathValue(self, colors: str, edges: list[list[int]]) -> int:
        n = len(colors)
        adj = [[] for _ in range(n)]
        in_degree = [0] * n
        for u, v in edges:
            adj[u].append(v)
            in_degree[v] += 1

        q = deque([i for i in range(n) if in_degree[i] == 0])
        dp = [[0] * 26 for _ in range(n)]
        for i in range(n):
            dp[i][ord(colors[i]) - ord('a')] = 1

        visited = 0
        ans = 0

        while q:
            u = q.popleft()
            visited += 1
            ans = max(ans, max(dp[u]))

            for v in adj[u]:
                v_col = ord(colors[v]) - ord('a')
                for c in range(26):
                    cand = dp[u][c] + (1 if c == v_col else 0)
                    if cand > dp[v][c]:
                        dp[v][c] = cand
                in_degree[v] -= 1
                if in_degree[v] == 0:
                    q.append(v)

        return ans if visited == n else -1

def test():
    sol = Solution()
    assert sol.largestPathValue("abaca", [[0,1],[0,2],[2,3],[3,4]]) == 3
    assert sol.largestPathValue("a", [[0,0]]) == -1

if __name__ == '__main__':
    test()
