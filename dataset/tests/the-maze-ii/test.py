import sys
import heapq
from typing import List

class Solution:
    def shortestDistance(self, maze: List[List[int]], start: List[int], destination: List[int]) -> int:
        m, n = len(maze), len(maze[0])
        dist = [[float('inf')] * n for _ in range(m)]
        dist[start[0]][start[1]] = 0
        pq = [(0, start[0], start[1])]
        dirs = [(-1, 0), (1, 0), (0, -1), (0, 1)]

        while pq:
            d, r, c = heapq.heappop(pq)
            if d > dist[r][c]:
                continue
            if r == destination[0] and c == destination[1]:
                return d
            for dr, dc in dirs:
                nr, nc = r, c
                count = 0
                while 0 <= nr + dr < m and 0 <= nc + dc < n and maze[nr + dr][nc + dc] == 0:
                    nr += dr
                    nc += dc
                    count += 1
                if d + count < dist[nr][nc]:
                    dist[nr][nc] = d + count
                    heapq.heappush(pq, (d + count, nr, nc))

        return -1

def test():
    sol = Solution()
    maze1 = [
        [0,0,1,0,0],
        [0,0,0,0,0],
        [0,0,0,1,0],
        [1,1,0,1,1],
        [0,0,0,0,0]
    ]
    assert sol.shortestDistance(maze1, [0,4], [4,4]) == 12, "test 1 failed"
    assert sol.shortestDistance(maze1, [0,4], [3,2]) == -1, "test 2 failed"
    print("✓ the-maze-ii passed")

if __name__ == "__main__":
    test()
