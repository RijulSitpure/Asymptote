import sys
from typing import List
from collections import deque

class Solution:
    def hasPath(self, maze: List[List[int]], start: List[int], destination: List[int]) -> bool:
        m, n = len(maze), len(maze[0])
        q = deque([(start[0], start[1])])
        visited = {(start[0], start[1])}
        dirs = [(-1, 0), (1, 0), (0, -1), (0, 1)]
        while q:
            r, c = q.popleft()
            if r == destination[0] and c == destination[1]:
                return True
            for dr, dc in dirs:
                nr, nc = r, c
                while 0 <= nr + dr < m and 0 <= nc + dc < n and maze[nr + dr][nc + dc] == 0:
                    nr += dr
                    nc += dc
                if (nr, nc) not in visited:
                    visited.add((nr, nc))
                    q.append((nr, nc))
        return False

def test():
    sol = Solution()
    maze1 = [
        [0,0,1,0,0],
        [0,0,0,0,0],
        [0,0,0,1,0],
        [1,1,0,1,1],
        [0,0,0,0,0]
    ]
    assert sol.hasPath(maze1, [0,4], [4,4]) is True, "test 1 failed"
    assert sol.hasPath(maze1, [0,4], [3,2]) is False, "test 2 failed"
    print("✓ the-maze passed")

if __name__ == "__main__":
    test()
