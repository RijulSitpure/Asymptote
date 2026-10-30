class Solution:
    def minDays(self, grid: list[list[int]]) -> int:
        R, C = len(grid), len(grid[0])
        def count_islands():
            vis = set()
            count = 0
            for r in range(R):
                for c in range(C):
                    if grid[r][c] == 1 and (r, c) not in vis:
                        count += 1
                        q = [(r, c)]
                        vis.add((r, c))
                        while q:
                            cr, cc = q.pop()
                            for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                                nr, nc = cr + dr, cc + dc
                                if 0 <= nr < R and 0 <= nc < C and grid[nr][nc] == 1 and (nr, nc) not in vis:
                                    vis.add((nr, nc))
                                    q.append((nr, nc))
            return count
        if count_islands() != 1: return 0
        for r in range(R):
            for c in range(C):
                if grid[r][c] == 1:
                    grid[r][c] = 0
                    if count_islands() != 1: return 1
                    grid[r][c] = 1
        return 2

sol = Solution()
assert sol.minDays([[0,1,1,0],[0,1,1,0],[0,0,0,0]]) == 2
assert sol.minDays([[1,1]]) == 2
print("All tests passed successfully.")
