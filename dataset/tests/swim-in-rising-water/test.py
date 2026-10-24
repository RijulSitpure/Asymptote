import heapq
from typing import List

class Solution:
    def swimInWater(self, grid: List[List[int]]) -> int:
        n = len(grid)
        pq = [(grid[0][0], 0, 0)]
        visited = {(0, 0)}

        while pq:
            elevation, r, c = heapq.heappop(pq)
            if r == n - 1 and c == n - 1:
                return elevation
            for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                nr, nc = r + dr, c + dc
                if 0 <= nr < n and 0 <= nc < n and (nr, nc) not in visited:
                    visited.add((nr, nc))
                    heapq.heappush(pq, (max(elevation, grid[nr][nc]), nr, nc))

        return 0

def test():
    sol = Solution()
    assert sol.swimInWater([[0, 2], [1, 3]]) == 3, "test 1 failed"
    grid2 = [
        [0, 1, 2, 3, 4],
        [24, 23, 22, 21, 5],
        [12, 13, 14, 15, 16],
        [11, 17, 18, 19, 20],
        [10, 9, 8, 7, 6]
    ]
    assert sol.swimInWater(grid2) == 16, "test 2 failed"
    print("✓ swim-in-rising-water passed")

if __name__ == "__main__":
    test()
