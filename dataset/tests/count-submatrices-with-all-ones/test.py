class Solution:
    def numSubmat(self, mat: list[list[int]]) -> int:
        R, C = len(mat), len(mat[0])
        width = [[0] * C for _ in range(R)]
        for r in range(R):
            for c in range(C):
                if mat[r][c] == 1:
                    width[r][c] = (width[r][c - 1] if c > 0 else 0) + 1
        ans = 0
        for r in range(R):
            for c in range(C):
                min_w = width[r][c]
                for k in range(r, -1, -1):
                    min_w = min(min_w, width[k][c])
                    if min_w == 0:
                        break
                    ans += min_w
        return ans

def test():
    sol = Solution()
    assert sol.numSubmat([[1,0,1],[1,1,0],[1,1,0]]) == 13, "test 1 failed"
    assert sol.numSubmat([[0,1,1,0],[0,1,1,1],[1,1,1,0]]) == 24, "test 2 failed"
    print("✓ count-submatrices-with-all-ones passed")

if __name__ == "__main__":
    test()
