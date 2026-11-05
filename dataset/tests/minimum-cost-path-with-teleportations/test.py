from typing import List
import heapq

class Solution:
    def minCost(self, grid: List[List[int]], teleportCost: int) -> int:
        m, n = len(grid), len(grid[0])
        dist = {}
        pq = [(0, 0, 0)]
        dist[(0, 0)] = 0
        while pq:
            d, r, c = heapq.heappop(pq)
            if r == m - 1 and c == n - 1:
                return d
            if d > dist.get((r, c), float('inf')):
                continue
            for nr, nc in ((r + 1, c), (r, c + 1)):
                if nr < m and nc < n:
                    cost = d + grid[nr][nc]
                    if cost < dist.get((nr, nc), float('inf')):
                        dist[(nr, nc)] = cost
                        heapq.heappush(pq, (cost, nr, nc))
            for nr in range(m):
                for nc in range(n):
                    if (nr > r or nc > c) and grid[nr][nc] == grid[r][c]:
                        cost = d + teleportCost
                        if cost < dist.get((nr, nc), float('inf')):
                            dist[(nr, nc)] = cost
                            heapq.heappush(pq, (cost, nr, nc))
        return dist.get((m - 1, n - 1), -1)

def run_tests():
    sol = Solution()
    g = [
        [1, 2],
        [3, 1]
    ]
    assert sol.minCost(g, 1) == 1
    g2 = [
        [1, 3],
        [2, 4]
    ]
    assert sol.minCost(g2, 10) == 6
    print("All tests passed for 3651.")

if __name__ == "__main__":
    run_tests()
