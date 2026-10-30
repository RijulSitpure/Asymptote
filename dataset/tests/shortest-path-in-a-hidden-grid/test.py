from collections import deque

class MockMaster:
    def __init__(self, maze, start, target):
        self.maze = maze
        self.r, self.c = start
        self.target = target
        self.dirs = {'U': (-1, 0), 'D': (1, 0), 'L': (0, -1), 'R': (0, 1)}

    def canMove(self, d):
        dr, dc = self.dirs[d]
        nr, nc = self.r + dr, self.c + dc
        return 0 <= nr < len(self.maze) and 0 <= nc < len(self.maze[0]) and self.maze[nr][nc] == 1

    def move(self, d):
        dr, dc = self.dirs[d]
        self.r += dr
        self.c += dc

    def isTarget(self):
        return (self.r, self.c) == self.target

class Solution:
    def findShortestPath(self, master: 'GridMaster') -> int:
        grid = {}
        target = None
        dirs = [('U', 'D', -1, 0), ('D', 'U', 1, 0), ('L', 'R', 0, -1), ('R', 'L', 0, 1)]
        def dfs(r, c):
            nonlocal target
            if master.isTarget():
                target = (r, c)
            grid[(r, c)] = 1
            for forward, backward, dr, dc in dirs:
                nr, nc = r + dr, c + dc
                if (nr, nc) not in grid and master.canMove(forward):
                    master.move(forward)
                    dfs(nr, nc)
                    master.move(backward)
                elif (nr, nc) not in grid:
                    grid[(nr, nc)] = 0
        dfs(0, 0)
        if target is None:
            return -1
        q = deque([(0, 0, 0)])
        visited = {(0, 0)}
        while q:
            r, c, d = q.popleft()
            if (r, c) == target:
                return d
            for _, _, dr, dc in dirs:
                nr, nc = r + dr, c + dc
                if grid.get((nr, nc), 0) == 1 and (nr, nc) not in visited:
                    visited.add((nr, nc))
                    q.append((nr, nc, d + 1))
        return -1

m = [
    [1, 1],
    [1, 1]
]
master = MockMaster(m, (0, 0), (1, 1))
sol = Solution()
assert sol.findShortestPath(master) == 2
print("All tests passed successfully.")
