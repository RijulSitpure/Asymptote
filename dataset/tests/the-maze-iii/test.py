import heapq
from typing import List

class Solution:
    def findShortestWay(self, maze: List[List[int]], ball: List[int], hole: List[int]) -> str:
        m, n = len(maze), len(maze[0])
        hr, hc = hole
        pq = [(0, "", ball[0], ball[1])]
        dist = {}
        dist[(ball[0], ball[1])] = (0, "")

        directions = [(1, 0, "d"), (0, -1, "l"), (0, 1, "r"), (-1, 0, "u")]

        while pq:
            d, path, r, c = heapq.heappop(pq)
            if (r, c) == (hr, hc):
                return path
            if (d, path) > dist.get((r, c), (float("inf"), "")):
                continue

            for dr, dc, move in directions:
                nr, nc, step = r, c, 0
                while 0 <= nr + dr < m and 0 <= nc + dc < n and maze[nr + dr][nc + dc] == 0:
                    nr += dr
                    nc += dc
                    step += 1
                    if (nr, nc) == (hr, hc):
                        break

                cand = (d + step, path + move)
                if cand < dist.get((nr, nc), (float("inf"), "")):
                    dist[(nr, nc)] = cand
                    heapq.heappush(pq, (cand[0], cand[1], nr, nc))

        return "impossible"

def test():
    sol = Solution()
    m1 = [[0,0,0,0,0],[1,1,0,0,1],[0,0,0,0,0],[0,1,0,0,1],[0,1,0,0,0]]
    assert sol.findShortestWay(m1, [4,3], [0,1]) == "lul", "test 1 failed"
    assert sol.findShortestWay(m1, [4,3], [3,0]) == "impossible", "test 2 failed"
    print("✓ the-maze-iii passed")

if __name__ == "__main__":
    test()
