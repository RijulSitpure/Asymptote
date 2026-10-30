class Solution:
    def maximalPathQuality(self, values: list[int], edges: list[list[int]], maxTime: int) -> int:
        n = len(values)
        adj = [[] for _ in range(n)]
        for u, v, t in edges:
            adj[u].append((v, t))
            adj[v].append((u, t))

        visited = [0] * n
        max_quality = 0

        def dfs(node: int, current_time: int, current_quality: int) -> None:
            nonlocal max_quality
            if visited[node] == 0:
                current_quality += values[node]
            visited[node] += 1

            if node == 0:
                max_quality = max(max_quality, current_quality)

            for nxt, t in adj[node]:
                if current_time + t <= maxTime:
                    dfs(nxt, current_time + t, current_quality)

            visited[node] -= 1

        dfs(0, 0, 0)
        return max_quality
