class Solution:
    def diagonalSum(self, mat: list[list[int]]) -> int:
        n = len(mat)
        ans = 0
        for i in range(n):
            ans += mat[i][i] + mat[i][n - 1 - i]
        if n % 2 == 1:
            ans -= mat[n // 2][n // 2]
        return ans

def test():
    sol = Solution()
    assert sol.diagonalSum([[1,2,3],[4,5,6],[7,8,9]]) == 25, "test 1 failed"
    assert sol.diagonalSum([[1,1,1,1],[1,1,1,1],[1,1,1,1],[1,1,1,1]]) == 8, "test 2 failed"
    assert sol.diagonalSum([[5]]) == 5, "test 3 failed"
    print("✓ matrix-diagonal-sum passed")

if __name__ == "__main__":
    test()
