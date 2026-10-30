class Solution:
    def checkWays(self, pairs: list[list[int]]) -> int:
        adj = {}
        for u, v in pairs:
            adj.setdefault(u, set()).add(v)
            adj.setdefault(v, set()).add(u)
        for u in adj:
            adj[u].add(u)
        n = len(adj)
        root_candidates = [u for u in adj if len(adj[u]) == n]
        if not root_candidates:
            return 0
        multiple = False
        nodes = sorted(adj.keys(), key=lambda x: len(adj[x]))
        for u in nodes:
            parent = None
            min_deg = float('inf')
            for v in adj[u]:
                if v != u and len(adj[v]) >= len(adj[u]) and len(adj[v]) < min_deg:
                    min_deg = len(adj[v])
                    parent = v
            if parent:
                if not adj[u].issubset(adj[parent]):
                    return 0
                if len(adj[u]) == len(adj[parent]):
                    multiple = True
        return 2 if multiple else 1

sol = Solution()
assert sol.checkWays([[1,2],[2,3]]) == 1
assert sol.checkWays([[1,2],[2,3],[1,3]]) == 2
assert sol.checkWays([[1,2],[2,3],[2,4],[1,5]]) == 0
print("All tests passed successfully.")
