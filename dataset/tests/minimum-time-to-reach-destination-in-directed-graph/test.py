from typing import List
import heapq

class Solution:
    def minTime(self, n: int, edges: List[List[int]]) -> int:
        adj = [[] for _ in range(n)]
        for u, v, w in edges:
            adj[u].append((v, w))
            
        dist = [float('inf')] * n
        dist[0] = 0
        heap = [(0, 0)]
        
        while heap:
            curr_time, u = heapq.heappop(heap)
            if u == n - 1:
                return curr_time
            if curr_time > dist[u]:
                continue
                
            for v, w in adj[u]:
                if curr_time + w < dist[v]:
                    dist[v] = curr_time + w
                    heapq.heappush(heap, (dist[v], v))
                    
        return dist[n - 1] if dist[n - 1] != float('inf') else -1

def run_tests():
    s = Solution()
    res1 = s.minTime(3, [[0, 1, 2], [1, 2, 3], [0, 2, 10]])
    assert res1 == 5, f"Expected 5, got {res1}" # 0 -> 1 -> 2: 2 + 3 = 5
    res2 = s.minTime(2, [])
    assert res2 == -1, f"Expected -1, got {res2}"
    print("3604 minimum-time-to-reach-destination-in-directed-graph PASSED")

if __name__ == "__main__":
    run_tests()
