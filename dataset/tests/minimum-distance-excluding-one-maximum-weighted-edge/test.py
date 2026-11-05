import heapq

class Solution:
    def minDistanceExcludingMaxEdge(self, n: int, edges: list[list[int]]) -> int:
        adj = [[] for _ in range(n)]
        for u, v, w in edges:
            adj[u].append((v, w))
            adj[v].append((u, w))
        
        dist = [[float('inf')] * 2 for _ in range(n)]
        dist[0][0] = 0
        pq = [(0, 0, 0)]
        
        while pq:
            d, u, used = heapq.heappop(pq)
            if d > dist[u][used]:
                continue
            if u == n - 1 and used == 1:
                return d
            
            for v, w in adj[u]:
                if d + w < dist[v][used]:
                    dist[v][used] = d + w
                    heapq.heappush(pq, (d + w, v, used))
                if used == 0 and d < dist[v][1]:
                    dist[v][1] = d
                    heapq.heappush(pq, (d, v, 1))
        
        return min(dist[n - 1][0], dist[n - 1][1])

def run_tests():
    sol = Solution()
    # Path 0 -> 1 (w=10) -> 2 (w=2). Exclude w=10 -> cost = 2
    edges = [[0, 1, 10], [1, 2, 2]]
    assert sol.minDistanceExcludingMaxEdge(3, edges) == 2
    # Single edge 0 -> 1 (w=5) -> cost = 0
    assert sol.minDistanceExcludingMaxEdge(2, [[0, 1, 5]]) == 0
    print("All tests passed for 3778.")

if __name__ == "__main__":
    run_tests()
