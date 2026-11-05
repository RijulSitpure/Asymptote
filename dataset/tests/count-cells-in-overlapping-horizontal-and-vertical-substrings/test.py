class Solution:
    def countCells(self, grid: list[list[str]], pattern: str) -> int:
        m, n = len(grid), len(grid[0])
        p_len = len(pattern)
        h_match = [[False] * n for _ in range(m)]
        v_match = [[False] * n for _ in range(m)]

        for i in range(m):
            row_str = "".join(grid[i])
            for j in range(n - p_len + 1):
                if row_str[j:j + p_len] == pattern:
                    for k in range(p_len):
                        h_match[i][j + k] = True

        for j in range(n):
            col_str = "".join(grid[i][j] for i in range(m))
            for i in range(m - p_len + 1):
                if col_str[i:i + p_len] == pattern:
                    for k in range(p_len):
                        v_match[i + k][j] = True

        ans = 0
        for i in range(m):
            for j in range(n):
                if h_match[i][j] and v_match[i][j]:
                    ans += 1
        return ans

def run_tests():
    s = Solution()
    grid = [["a", "b", "c"], ["b", "c", "d"], ["c", "d", "e"]]
    assert s.countCells(grid, "bc") == 3
    print("All tests passed for count-cells-in-overlapping-horizontal-and-vertical-substrings")

if __name__ == '__main__':
    run_tests()
