import heapq

class Solution:
    def minCost(self, maxTime: int, edges: list[list[int]], passingFees: list[int]) -> int:
        n = len(passingFees)
        adj = [[] for _ in range(n)]
        for u, v, time in edges:
            adj[u].append((v, time))
            adj[v].append((u, time))
            
        min_time = [float("inf")] * n
        pq = [(passingFees[0], 0, 0)]
        min_time[0] = 0
        
        while pq:
            cost, u, t = heapq.heappop(pq)
            if u == n - 1:
                return cost
            for v, travel_time in adj[u]:
                nt = t + travel_time
                if nt <= maxTime and nt < min_time[v]:
                    min_time[v] = nt
                    heapq.heappush(pq, (cost + passingFees[v], v, nt))
        return -1

def test_min_cost():
    sol = Solution()
    assert sol.minCost(30, [[0,1,10],[1,2,10],[2,5,10],[0,3,1],[3,4,10],[4,5,15]], [5,1,2,20,20,3]) == 11
    assert sol.minCost(29, [[0,1,10],[1,2,10],[2,5,10],[0,3,1],[3,4,10],[4,5,15]], [5,1,2,20,20,3]) == 48
    assert sol.minCost(25, [[0,1,10],[1,2,10],[2,5,10],[0,3,1],[3,4,10],[4,5,15]], [5,1,2,20,20,3]) == -1

