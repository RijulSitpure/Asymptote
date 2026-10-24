import sys
from typing import List
from collections import deque

class Solution:
    def shortestDistance(self, grid: List[List[int]]) -> int:
        m, n = len(grid), len(grid[0])
        total_dist = [[0] * n for _ in range(m)]
        reach_count = [[0] * n for _ in range(m)]
        buildings = 0
        dirs = [(-1, 0), (1, 0), (0, -1), (0, 1)]

        for r in range(m):
            for c in range(n):
                if grid[r][c] == 1:
                    buildings += 1
                    q = deque([(r, c, 0)])
                    visited = {(r, c)}
                    while q:
                        cr, cc, d = q.popleft()
                        for dr, dc in dirs:
                            nr, nc = cr + dr, cc + dc
                            if 0 <= nr < m and 0 <= nc < n and grid[nr][nc] == 0 and (nr, nc) not in visited:
                                visited.add((nr, nc))
                                reach_count[nr][nc] += 1
                                total_dist[nr][nc] += d + 1
                                q.append((nr, nc, d + 1))

        ans = float("inf")
        for r in range(m):
            for c in range(n):
                if grid[r][c] == 0 and reach_count[r][c] == buildings:
                    ans = min(ans, total_dist[r][c])

        return -1 if ans == float("inf") else ans

def test():
    sol = Solution()
    g1 = [[1,0,2,0,1],[0,0,0,0,0],[0,0,1,0,0]]
    assert sol.shortestDistance(g1) == 7, "test 1 failed"
    g2 = [[1]]
    assert sol.shortestDistance(g2) == -1, "test 2 failed"
    print("✓ shortest-distance-from-all-buildings passed")

if __name__ == "__main__":
    test()
