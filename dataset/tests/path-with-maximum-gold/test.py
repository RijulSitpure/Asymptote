class Solution:
    def getMaximumGold(self, grid: list[list[int]]) -> int:
        m, n = len(grid), len(grid[0])
        
        def dfs(r, c):
            if r < 0 or r >= m or c < 0 or c >= n or grid[r][c] == 0:
                return 0
            gold = grid[r][c]
            grid[r][c] = 0
            best = max(dfs(r + 1, c), dfs(r - 1, c), dfs(r, c + 1), dfs(r, c - 1))
            grid[r][c] = gold
            return gold + best
            
        ans = 0
        for i in range(m):
            for j in range(n):
                if grid[i][j] > 0:
                    ans = max(ans, dfs(i, j))
        return ans

def test():
    sol = Solution()
    g1 = [[0, 6, 0], [5, 8, 7], [0, 9, 0]]
    assert sol.getMaximumGold(g1) == 24, "test 1 failed"
    g2 = [[1, 0, 7], [2, 0, 6], [3, 4, 5], [0, 3, 0], [9, 0, 20]]
    assert sol.getMaximumGold(g2) == 28, "test 2 failed"
    print("✓ path-with-maximum-gold passed")

if __name__ == "__main__":
    test()
