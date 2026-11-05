from typing import List

class Solution:
    def flipSubmatrix(self, grid: List[List[int]], x: int, y: int, k: int) -> List[List[int]]:
        for r in range(k // 2):
            r1 = x + r
            r2 = x + k - 1 - r
            for c in range(k):
                c_idx = y + c
                grid[r1][c_idx], grid[r2][c_idx] = grid[r2][c_idx], grid[r1][c_idx]
        return grid

def run_tests():
    sol = Solution()
    g = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ]
    res = sol.flipSubmatrix(g, 0, 0, 3)
    expected = [
        [7, 8, 9],
        [4, 5, 6],
        [1, 2, 3]
    ]
    assert res == expected
    print("All tests passed for 3643.")

if __name__ == "__main__":
    run_tests()
