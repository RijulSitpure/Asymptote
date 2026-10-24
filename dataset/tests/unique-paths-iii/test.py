from typing import List

class Solution:
    def uniquePathsIII(self, grid: List[List[int]]) -> int:
        rows, cols = len(grid), len(grid[0])
        sr, sc = 0, 0
        walkable = 0
        for r in range(rows):
            for c in range(cols):
                if grid[r][c] != -1:
                    walkable += 1
                if grid[r][c] == 1:
                    sr, sc = r, c
        def dfs(r: int, c: int, remain: int) -> int:
            if grid[r][c] == 2:
                return 1 if remain == 1 else 0
            temp = grid[r][c]
            grid[r][c] = -1
            paths = 0
            for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                nr, nc = r + dr, c + dc
                if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] != -1:
                    paths += dfs(nr, nc, remain - 1)
            grid[r][c] = temp
            return paths
        return dfs(sr, sc, walkable)

def test():
    sol = Solution()
    g1 = [[1,0,0,0],[0,0,0,0],[0,0,2,-1]]
    assert sol.uniquePathsIII(g1) == 2, "test 1 failed"
    g2 = [[1,0,0,0],[0,0,0,0],[0,0,0,2]]
    assert sol.uniquePathsIII(g2) == 4, "test 2 failed"
    g3 = [[0,1],[2,0]]
    assert sol.uniquePathsIII(g3) == 0, "test 3 failed"
    print("✓ unique-paths-iii passed")

if __name__ == "__main__":
    test()
