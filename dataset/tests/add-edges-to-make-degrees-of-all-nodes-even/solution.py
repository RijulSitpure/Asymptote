class Solution:
    def isPossible(self, n: int, edges: list[list[int]]) -> bool:
        adj = [set() for _ in range(n + 1)]
        for u, v in edges:
            adj[u].add(v)
            adj[v].add(u)
        odds = [i for i in range(1, n + 1) if len(adj[i]) % 2 == 1]
        if len(odds) == 0:
            return True
        if len(odds) == 2:
            a, b = odds
            if b not in adj[a]:
                return True
            for c in range(1, n + 1):
                if c != a and c != b and c not in adj[a] and c not in adj[b]:
                    return True
            return False
        if len(odds) == 4:
            a, b, c, d = odds
            if (b not in adj[a] and d not in adj[c]) or \
               (c not in adj[a] and d not in adj[b]) or \
               (d not in adj[a] and c not in adj[b]):
                return True
            return False
        return False
