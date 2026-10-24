from typing import List
from collections import defaultdict

class Solution:
    def numSubmatrixSumTarget(self, matrix: List[List[int]], target: int) -> int:
        R, C = len(matrix), len(matrix[0])
        for r in range(R):
            for c in range(1, C):
                matrix[r][c] += matrix[r][c - 1]

        res = 0
        for c1 in range(C):
            for c2 in range(c1, C):
                counts = defaultdict(int)
                counts[0] = 1
                cur = 0
                for r in range(R):
                    row_sum = matrix[r][c2] - (matrix[r][c1 - 1] if c1 > 0 else 0)
                    cur += row_sum
                    res += counts[cur - target]
                    counts[cur] += 1
        return res

def test():
    sol = Solution()
    m1 = [[0,1,0],[1,1,1],[0,1,0]]
    assert sol.numSubmatrixSumTarget(m1, 0) == 4, "test 1 failed"
    m2 = [[1,-1],[-1,1]]
    assert sol.numSubmatrixSumTarget(m2, 0) == 5, "test 2 failed"
    print("✓ number-of-submatrices-that-sum-to-target passed")

if __name__ == "__main__":
    test()
