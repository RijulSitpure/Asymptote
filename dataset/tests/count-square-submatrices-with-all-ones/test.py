class Solution:
    def countSquares(self, matrix: list[list[int]]) -> int:
        m, n = len(matrix), len(matrix[0])
        ans = 0
        for r in range(m):
            for c in range(n):
                if matrix[r][c] == 1 and r > 0 and c > 0:
                    matrix[r][c] = 1 + min(matrix[r - 1][c], matrix[r][c - 1], matrix[r - 1][c - 1])
                ans += matrix[r][c]
        return ans

def test():
    sol = Solution()
    m1 = [
        [0,1,1,1],
        [1,1,1,1],
        [0,1,1,1]
    ]
    assert sol.countSquares(m1) == 15, "test 1 failed"
    m2 = [
        [1,0,1],
        [1,1,0],
        [1,1,0]
    ]
    assert sol.countSquares(m2) == 7, "test 2 failed"
    print("✓ count-square-submatrices-with-all-ones passed")

if __name__ == "__main__":
    test()
