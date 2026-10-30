class Solution:
    def mostSimilar(self, n: int, roads: list[list[int]], names: list[str], targetPath: list[str]) -> list[int]:
        m = len(targetPath)
        adj = [[] for _ in range(n)]
        for u, v in roads:
            adj[u].append(v)
            adj[v].append(u)
        dp = [[float('inf')] * n for _ in range(m)]
        parent = [[-1] * n for _ in range(m)]
        for u in range(n):
            dp[0][u] = 0 if names[u] == targetPath[0] else 1
        for t in range(1, m):
            for u in range(n):
                cost = 0 if names[u] == targetPath[t] else 1
                for v in adj[u]:
                    if dp[t - 1][v] + cost < dp[t][u]:
                        dp[t][u] = dp[t - 1][v] + cost
                        parent[t][u] = v
        best_end = min(range(n), key=lambda u: dp[m - 1][u])
        path = []
        curr = best_end
        for t in range(m - 1, -1, -1):
            path.append(curr)
            curr = parent[t][curr]
        return path[::-1]

sol = Solution()
n = 5
roads = [[0,2],[0,3],[1,2],[1,3],[1,4],[2,4],[3,4]]
names = ["ATL","PEK","LAX","DXB","HND"]
targetPath = ["ATL","DXB","HND","LAX"]
res = sol.mostSimilar(n, roads, names, targetPath)
assert len(res) == 4
print("All tests passed successfully.")
