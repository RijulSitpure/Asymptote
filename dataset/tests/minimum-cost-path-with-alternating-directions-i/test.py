from typing import List
import heapq

class Solution:
    def minCost(self, grid: List[List[int]]) -> int:
        m, n = len(grid), len(grid[0])
        # State: (cost, r, c, last_dir) where last_dir in {0: none, 1: horizontal, 2: vertical}
        dist = {}
        heap = [(grid[0][0], 0, 0, 0)]
        dist[(0, 0, 0)] = grid[0][0]
        
        while heap:
            cost, r, c, last_dir = heapq.heappop(heap)
            if r == m - 1 and c == n - 1:
                return cost
            if cost > dist.get((r, c, last_dir), float('inf')):
                continue
                
            # If last_dir != horizontal (1), we can move horizontal (left or right)
            if last_dir != 1:
                for dc in (-1, 1):
                    nc = c + dc
                    if 0 <= nc < n:
                        nxt_cost = cost + grid[r][nc]
                        if nxt_cost < dist.get((r, nc, 1), float('inf')):
                            dist[(r, nc, 1)] = nxt_cost
                            heapq.heappush(heap, (nxt_cost, r, nc, 1))
                            
            # If last_dir != vertical (2), we can move vertical (up or down)
            if last_dir != 2:
                for dr in (-1, 1):
                    nr = r + dr
                    if 0 <= nr < m:
                        nxt_cost = cost + grid[nr][c]
                        if nxt_cost < dist.get((nr, c, 2), float('inf')):
                            dist[(nr, c, 2)] = nxt_cost
                            heapq.heappush(heap, (nxt_cost, nr, c, 2))
                            
        return -1

def run_tests():
    s = Solution()
    res1 = s.minCost([[1, 2], [3, 4]])
    assert res1 == 7, f"Expected 7, got {res1}" # (0,0)->(0,1)->(1,1): 1 + 2 + 4 = 7 (H then V)
    res2 = s.minCost([[1, 1], [1, 1]])
    assert res2 == 3, f"Expected 3, got {res2}"
    print("3596 minimum-cost-path-with-alternating-directions-i PASSED")

if __name__ == "__main__":
    run_tests()
