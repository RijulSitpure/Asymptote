class Solution:
    def restoreMatrix(self, rowSum: list[int], colSum: list[int]) -> list[list[int]]:
        m, n = len(rowSum), len(colSum)
        res = [[0] * n for _ in range(m)]
        for i in range(m):
            for j in range(n):
                val = min(rowSum[i], colSum[j])
                res[i][j] = val
                rowSum[i] -= val
                colSum[j] -= val
        return res

def test():
    sol = Solution()
    res = sol.restoreMatrix([3, 8], [4, 7])
    assert [sum(r) for r in res] == [3, 8]
    assert [sum(res[i][j] for i in range(2)) for j in range(2)] == [4, 7]
    res2 = sol.restoreMatrix([5, 7, 10], [8, 6, 8])
    assert [sum(r) for r in res2] == [5, 7, 10]
    assert [sum(res2[i][j] for i in range(3)) for j in range(3)] == [8, 6, 8]

    print("✓ find-valid-matrix-given-row-and-column-sums passed")

if __name__ == '__main__':
    test()
