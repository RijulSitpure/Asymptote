class Solution:
    def shiftGrid(self, grid: list[list[int]], k: int) -> list[list[int]]:
        m, n = len(grid), len(grid[0])
        total = m * n
        k %= total
        res = [[0] * n for _ in range(m)]
        for r in range(m):
            for c in range(n):
                idx = (r * n + c + k) % total
                res[idx // n][idx % n] = grid[r][c]
        return res

def test():
    sol = Solution()
    g1 = [[1,2,3],[4,5,6],[7,8,9]]
    assert sol.shiftGrid(g1, 1) == [[9,1,2],[3,4,5],[6,7,8]], "test 1 failed"
    print("✓ shift-2d-grid passed")

if __name__ == "__main__":
    test()
