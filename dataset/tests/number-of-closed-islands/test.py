class Solution:
    def closedIsland(self, grid: list[list[int]]) -> int:
        m, n = len(grid), len(grid[0])
        
        def flood(r, c):
            if r < 0 or r >= m or c < 0 or c >= n or grid[r][c] == 1:
                return
            grid[r][c] = 1
            flood(r + 1, c)
            flood(r - 1, c)
            flood(r, c + 1)
            flood(r, c - 1)
            
        for i in range(m):
            if grid[i][0] == 0: flood(i, 0)
            if grid[i][n - 1] == 0: flood(i, n - 1)
        for j in range(n):
            if grid[0][j] == 0: flood(0, j)
            if grid[m - 1][j] == 0: flood(m - 1, j)
            
        ans = 0
        for i in range(m):
            for j in range(n):
                if grid[i][j] == 0:
                    ans += 1
                    flood(i, j)
        return ans

def test():
    sol = Solution()
    g1 = [
        [1,1,1,1,1,1,1,0],
        [1,0,0,0,0,1,1,0],
        [1,0,1,0,1,1,1,0],
        [1,0,0,0,0,1,0,1],
        [1,1,1,1,1,1,1,0]
    ]
    assert sol.closedIsland(g1) == 2, "test 1 failed"
    g2 = [[0,0,1,0,0],[0,1,0,1,0],[0,1,1,1,0]]
    assert sol.closedIsland(g2) == 1, "test 2 failed"
    print("✓ number-of-closed-islands passed")

if __name__ == "__main__":
    test()
