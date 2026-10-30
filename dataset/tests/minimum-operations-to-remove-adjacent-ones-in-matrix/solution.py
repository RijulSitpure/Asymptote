class Solution:
    def minimumOperations(self, grid: list[list[int]]) -> int:
        m, n = len(grid), len(grid[0])
        adj = {}
        even_nodes = []

        for r in range(m):
            for c in range(n):
                if grid[r][c] == 1:
                    u = r * n + c
                    if (r + c) % 2 == 0:
                        even_nodes.append(u)
                        adj[u] = []
                        for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                            nr, nc = r + dr, c + dc
                            if 0 <= nr < m and 0 <= nc < n and grid[nr][nc] == 1:
                                adj[u].append(nr * n + nc)

        match = {}

        def dfs(u: int, visited: set) -> bool:
            for v in adj.get(u, []):
                if v not in visited:
                    visited.add(v)
                    if v not in match or dfs(match[v], visited):
                        match[v] = u
                        return True
            return False

        matching = 0
        for u in even_nodes:
            if dfs(u, set()):
                matching += 1

        return matching
