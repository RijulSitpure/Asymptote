class Solution:
    def collectTheCoins(self, coins: list[int], edges: list[list[int]]) -> int:
        from collections import deque
        n = len(coins)
        adj = [set() for _ in range(n)]
        for u, v in edges:
            adj[u].add(v)
            adj[v].add(u)
        q = deque([i for i in range(n) if len(adj[i]) == 1 and coins[i] == 0])
        while q:
            u = q.popleft()
            if not adj[u]:
                continue
            v = adj[u].pop()
            adj[v].remove(u)
            if len(adj[v]) == 1 and coins[v] == 0:
                q.append(v)
        for _ in range(2):
            leaves = [i for i in range(n) if len(adj[i]) == 1]
            for u in leaves:
                if adj[u]:
                    v = adj[u].pop()
                    adj[v].remove(u)
        remaining_edges = sum(len(adj[i]) for i in range(n)) // 2
        return 2 * remaining_edges
