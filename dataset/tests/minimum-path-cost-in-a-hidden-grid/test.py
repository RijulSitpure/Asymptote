import heapq

class Solution:
    def findShortestPath(self, master: 'GridMaster') -> int:
        grid = {}
        target = None
        dirs = [('U', 'D', -1, 0), ('D', 'U', 1, 0), ('L', 'R', 0, -1), ('R', 'L', 0, 1)]

        def dfs(r, c):
            nonlocal target
            if master.isTarget():
                target = (r, c)
            for fwd, bwd, dr, dc in dirs:
                nr, nc = r + dr, c + dc
                if (nr, nc) not in grid and master.canMove(fwd):
                    cost = master.move(fwd)
                    grid[(nr, nc)] = cost
                    dfs(nr, nc)
                    master.move(bwd)

        grid[(0, 0)] = 0
        dfs(0, 0)
        if not target:
            return -1

        pq = [(0, 0, 0)]
        dist = {(0, 0): 0}
        while pq:
            d, r, c = heapq.heappop(pq)
            if (r, c) == target:
                return d
            if d > dist.get((r, c), float('inf')):
                continue
            for _, _, dr, dc in dirs:
                nr, nc = r + dr, c + dc
                if (nr, nc) in grid:
                    w = grid[(nr, nc)]
                    if d + w < dist.get((nr, nc), float('inf')):
                        dist[(nr, nc)] = d + w
                        heapq.heappush(pq, (d + w, nr, nc))
        return -1

class MockGridMaster:
    def __init__(self, grid, start, target):
        self.grid = grid
        self.r, self.c = start
        self.target = target
        self.dirs = {'U': (-1, 0), 'D': (1, 0), 'L': (0, -1), 'R': (0, 1)}

    def canMove(self, direction: str) -> bool:
        dr, dc = self.dirs[direction]
        nr, nc = self.r + dr, self.c + dc
        return 0 <= nr < len(self.grid) and 0 <= nc < len(self.grid[0]) and self.grid[nr][nc] > 0

    def move(self, direction: str) -> int:
        dr, dc = self.dirs[direction]
        self.r += dr
        self.c += dc
        return self.grid[self.r][self.c]

    def isTarget(self) -> bool:
        return (self.r, self.c) == self.target

def test_hidden_grid():
    sol = Solution()
    grid = [
        [1, 2, 3],
        [1, 1, 1],
        [4, 5, 1]
    ]
    master = MockGridMaster(grid, (0, 0), (2, 2))
    assert sol.findShortestPath(master) == 4

