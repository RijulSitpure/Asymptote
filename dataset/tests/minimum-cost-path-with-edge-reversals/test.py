from typing import List
import heapq
from collections import defaultdict

class Solution:
    def minCostPath(self, n: int, edges: List[List[int]], reversalCost: int) -> int:
        adj = defaultdict(list)
        for u, v, w in edges:
            adj[u].append((v, w))
            adj[v].append((u, reversalCost + w))
        dist = {0: 0}
        pq = [(0, 0)]
        while pq:
            d, u = heapq.heappop(pq)
            if u == n - 1:
                return d
            if d > dist.get(u, float('inf')):
                continue
            for v, weight in adj[u]:
                new_d = d + weight
                if new_d < dist.get(v, float('inf')):
                    dist[v] = new_d
                    heapq.heappush(pq, (new_d, v))
        return dist.get(n - 1, -1)

def run_tests():
    sol = Solution()
    assert sol.minCostPath(4, [[0, 1, 2], [2, 1, 1], [2, 3, 3]], 5) == 11
    assert sol.minCostPath(3, [[0, 1, 1], [1, 2, 2]], 10) == 3
    print("All tests passed for 3650.")

if __name__ == "__main__":
    run_tests()
