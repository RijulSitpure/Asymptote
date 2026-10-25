class Solution:
    def maxProductPath(self, grid: list[list[int]]) -> int:
        m, n = len(grid), len(grid[0])
        dp_max = [[0] * n for _ in range(m)]
        dp_min = [[0] * n for _ in range(m)]
        dp_max[0][0] = dp_min[0][0] = grid[0][0]
        for r in range(1, m):
            dp_max[r][0] = dp_min[r][0] = dp_max[r-1][0] * grid[r][0]
        for c in range(1, n):
            dp_max[0][c] = dp_min[0][c] = dp_max[0][c-1] * grid[0][c]
        for r in range(1, m):
            for c in range(1, n):
                val = grid[r][c]
                cands = [
                    dp_max[r-1][c] * val, dp_min[r-1][c] * val,
                    dp_max[r][c-1] * val, dp_min[r][c-1] * val
                ]
                dp_max[r][c] = max(cands)
                dp_min[r][c] = min(cands)
        ans = dp_max[m-1][n-1]
        MOD = 10**9 + 7
        return ans % MOD if ans >= 0 else -1

def test():
    sol = Solution()
    assert sol.maxProductPath([[-1,-2,-3],[-2,-3,-3],[-3,-3,-2]]) == -1
    assert sol.maxProductPath([[1,-2,1],[1,-2,1],[3,-4,1]]) == 8
    assert sol.maxProductPath([[1, 3], [0, -4]]) == 0

    print("✓ maximum-non-negative-product-in-a-matrix passed")

if __name__ == '__main__':
    test()
