import heapq

class Solution:
    def minRepairCost(self, n: int, edges: list[list[int]]) -> int:
        adj = [[] for _ in range(n)]
        for u, v, cost in edges:
            adj[u].append((v, cost))
            adj[v].append((u, cost))
        
        dist = [float('inf')] * n
        dist[0] = 0
        pq = [(0, 0)]
        
        while pq:
            d, u = heapq.heappop(pq)
            if d > dist[u]:
                continue
            if u == n - 1:
                return d
            for v, cost in adj[u]:
                if d + cost < dist[v]:
                    dist[v] = d + cost
                    heapq.heappush(pq, (d + cost, v))
        
        return dist[n - 1] if dist[n - 1] != float('inf') else -1

def run_tests():
    sol = Solution()
    edges = [[0, 1, 0], [1, 2, 5], [0, 2, 8]]
    assert sol.minRepairCost(3, edges) == 5
    assert sol.minRepairCost(2, [[0, 1, 10]]) == 10
    print("All tests passed for 3807.")

if __name__ == "__main__":
    run_tests()
