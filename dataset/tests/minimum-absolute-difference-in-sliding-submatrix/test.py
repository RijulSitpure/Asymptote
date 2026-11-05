from typing import List

class Solution:
    def minAbsDiff(self, grid: List[List[int]], k: int) -> List[List[int]]:
        m, n = len(grid), len(grid[0])
        rows, cols = m - k + 1, n - k + 1
        ans = [[0] * cols for _ in range(rows)]
        for i in range(rows):
            for j in range(cols):
                elems = []
                for r in range(i, i + k):
                    for c in range(j, j + k):
                        elems.append(grid[r][c])
                u = sorted(set(elems))
                if len(u) < 2:
                    ans[i][j] = 0
                else:
                    ans[i][j] = min(u[x] - u[x - 1] for x in range(1, len(u)))
        return ans

def run_tests():
    s = Solution()
    res = s.minAbsDiff([[1, 5], [3, 9]], 2)
    assert res == [[2]], f"Expected [[2]], got {res}"
    print("3567 minimum-absolute-difference-in-sliding-submatrix PASSED")

if __name__ == "__main__":
    run_tests()
