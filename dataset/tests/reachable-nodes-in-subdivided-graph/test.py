from typing import List
import heapq

class Solution:
    def reachableNodes(self, edges: List[List[int]], maxMoves: int, n: int) -> int:
        adj = [[] for _ in range(n)]
        for u, v, w in edges:
            adj[u].append((v, w))
            adj[v].append((u, w))

        dist = {}
        pq = [(0, 0)]
        while pq:
            d, u = heapq.heappop(pq)
            if u in dist:
                continue
            dist[u] = d
            for v, w in adj[u]:
                if v not in dist and d + w + 1 <= maxMoves:
                    heapq.heappush(pq, (d + w + 1, v))

        ans = len(dist)
        for u, v, w in edges:
            a = max(0, maxMoves - dist[u]) if u in dist else 0
            b = max(0, maxMoves - dist[v]) if v in dist else 0
            ans += min(w, a + b)
        return ans

def test():
    sol = Solution()
    assert sol.reachableNodes([[0, 1, 10], [0, 2, 1], [1, 2, 2]], 6, 3) == 13, "test 1 failed"
    assert sol.reachableNodes([[0, 1, 4], [1, 2, 6], [0, 2, 8], [1, 3, 1]], 10, 4) == 23, "test 2 failed"
    assert sol.reachableNodes([[1, 2, 4], [1, 4, 5], [1, 3, 1], [2, 3, 4], [3, 4, 5]], 17, 5) == 1, "test 3 failed"
    print("✓ reachable-nodes-in-subdivided-graph passed")

if __name__ == "__main__":
    test()
