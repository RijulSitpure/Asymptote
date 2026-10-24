import heapq
from typing import List

class Solution:
    def trapRainWater(self, heightMap: List[List[int]]) -> int:
        if not heightMap or not heightMap[0]:
            return 0
        m, n = len(heightMap), len(heightMap[0])
        visited = [[False] * n for _ in range(m)]
        heap = []

        for r in range(m):
            for c in range(n):
                if r == 0 or r == m - 1 or c == 0 or c == n - 1:
                    heapq.heappush(heap, (heightMap[r][c], r, c))
                    visited[r][c] = True

        total_water = 0
        dirs = [(-1, 0), (1, 0), (0, -1), (0, 1)]

        while heap:
            h, r, c = heapq.heappop(heap)
            for dr, dc in dirs:
                nr, nc = r + dr, c + dc
                if 0 <= nr < m and 0 <= nc < n and not visited[nr][nc]:
                    visited[nr][nc] = True
                    total_water += max(0, h - heightMap[nr][nc])
                    heapq.heappush(heap, (max(h, heightMap[nr][nc]), nr, nc))

        return total_water

def test():
    sol = Solution()
    t1 = [[1,4,3,1,3,2],[3,2,1,3,2,4],[2,3,3,2,3,1]]
    assert sol.trapRainWater(t1) == 4, "test 1 failed"
    t2 = [[3,3,3,3,3],[3,2,2,2,3],[3,2,1,2,3],[3,2,2,2,3],[3,3,3,3,3]]
    assert sol.trapRainWater(t2) == 10, "test 2 failed"
    print("✓ trapping-rain-water-ii passed")

if __name__ == "__main__":
    test()
