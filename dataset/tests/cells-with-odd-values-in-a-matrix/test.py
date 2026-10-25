class Solution:
    def oddCells(self, m: int, n: int, indices: list[list[int]]) -> int:
        rows = [0] * m
        cols = [0] * n
        for r, c in indices:
            rows[r] ^= 1
            cols[c] ^= 1
        odd_r = sum(rows)
        odd_c = sum(cols)
        return odd_r * (n - odd_c) + (m - odd_r) * odd_c

def test():
    sol = Solution()
    assert sol.oddCells(2, 3, [[0,1],[1,1]]) == 6, "test 1 failed"
    assert sol.oddCells(2, 2, [[1,1],[0,0]]) == 0, "test 2 failed"
    print("✓ cells-with-odd-values-in-a-matrix passed")

if __name__ == "__main__":
    test()
