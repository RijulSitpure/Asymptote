import heapq
from collections import defaultdict

class Solution:
    def countRestrictedPaths(self, n: int, edges: list[list[int]]) -> int:
        MOD = 10**9 + 7
        adj = defaultdict(list)
        for u, v, w in edges:
            adj[u].append((v, w))
            adj[v].append((u, w))

        dist = [float('inf')] * (n + 1)
        dist[n] = 0
        pq = [(0, n)]
        while pq:
            d, u = heapq.heappop(pq)
            if d > dist[u]:
                continue
            for v, w in adj[u]:
                if dist[u] + w < dist[v]:
                    dist[v] = dist[u] + w
                    heapq.heappush(pq, (dist[v], v))

        memo = {}

        def dfs(u: int) -> int:
            if u == n:
                return 1
            if u in memo:
                return memo[u]
            ans = 0
            for v, _ in adj[u]:
                if dist[u] > dist[v]:
                    ans = (ans + dfs(v)) % MOD
            memo[u] = ans
            return ans

        return dfs(1)

def test():
    sol = Solution()
    edges1 = [[1,2,3],[1,3,3],[2,3,1],[1,4,4],[2,4,5],[3,5,1],[4,5,1]]
    assert sol.countRestrictedPaths(5, edges1) == 4
    edges2 = [[1,3,1],[4,1,2],[7,3,4],[2,5,3],[5,6,1],[6,7,2],[7,5,3],[2,6,4]]
    assert sol.countRestrictedPaths(7, edges2) == 1

    print("✓ number-of-restricted-paths-from-first-to-last-node passed")

if __name__ == '__main__':
    test()
