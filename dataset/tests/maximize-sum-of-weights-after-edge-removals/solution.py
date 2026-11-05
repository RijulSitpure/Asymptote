import sys
sys.setrecursionlimit(300_000)

class Solution:
    def maximizeSumOfWeights(self, edges: list[list[int]], k: int) -> int:
        n = len(edges) + 1
        adj = [[] for _ in range(n)]
        for u, v, w in edges:
            adj[u].append((v, w))
            adj[v].append((u, w))
            
        def dfs(u: int, p: int) -> tuple[int, int]:
            base_sum = 0
            gains = []
            for v, w in adj[u]:
                if v == p:
                    continue
                v0, v1 = dfs(v, u)
                base_sum += v0
                gain = w + v1 - v0
                if gain > 0:
                    gains.append(gain)
                    
            gains.sort(reverse=True)
            res0 = base_sum + sum(gains[:k])
            res1 = base_sum + sum(gains[:max(0, k - 1)])
            return res0, res1
            
        return dfs(0, -1)[0]
