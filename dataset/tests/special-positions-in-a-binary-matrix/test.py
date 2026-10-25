class Solution:
    def numSpecial(self, mat: list[list[int]]) -> int:
        R, C = len(mat), len(mat[0])
        row_sum = [sum(row) for row in mat]
        col_sum = [sum(mat[r][c] for r in range(R)) for c in range(C)]
        ans = 0
        for r in range(R):
            for c in range(C):
                if mat[r][c] == 1 and row_sum[r] == 1 and col_sum[c] == 1:
                    ans += 1
        return ans

def test():
    sol = Solution()
    assert sol.numSpecial([[1,0,0],[0,0,1],[1,0,0]]) == 1, "test 1 failed"
    assert sol.numSpecial([[1,0,0],[0,1,0],[0,0,1]]) == 3, "test 2 failed"
    print("✓ special-positions-in-a-binary-matrix passed")

if __name__ == "__main__":
    test()
