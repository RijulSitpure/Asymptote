class Solution:
    def largest1BorderedSquare(self, grid: list[list[int]]) -> int:
        R, C = len(grid), len(grid[0])
        right = [[0] * C for _ in range(R)]
        down = [[0] * C for _ in range(R)]
        
        for r in range(R - 1, -1, -1):
            for c in range(C - 1, -1, -1):
                if grid[r][c] == 1:
                    right[r][c] = 1 + (right[r][c + 1] if c + 1 < C else 0)
                    down[r][c] = 1 + (down[r + 1][c] if r + 1 < R else 0)
        
        max_d = 0
        for r in range(R):
            for c in range(C):
                limit = min(right[r][c], down[r][c])
                for d in range(limit, max_d, -1):
                    if right[r + d - 1][c] >= d and down[r][c + d - 1] >= d:
                        max_d = max(max_d, d)
                        break
        return max_d * max_d

def test():
    sol = Solution()
    g1 = [[1,1,1],[1,0,1],[1,1,1]]
    assert sol.largest1BorderedSquare(g1) == 9, "test 1 failed"
    g2 = [[1,1,0,0]]
    assert sol.largest1BorderedSquare(g2) == 1, "test 2 failed"
    print("✓ largest-1-bordered-square passed")

if __name__ == "__main__":
    test()
