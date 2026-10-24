import sys
from typing import List

class Solution:
    def multiply(self, mat1: List[List[int]], mat2: List[List[int]]) -> List[List[int]]:
        m, k, n = len(mat1), len(mat1[0]), len(mat2[0])
        res = [[0] * n for _ in range(m)]
        for i in range(m):
            for p in range(k):
                if mat1[i][p] != 0:
                    for j in range(n):
                        res[i][j] += mat1[i][p] * mat2[p][j]
        return res

def test():
    sol = Solution()
    m1 = [[1,0,0],[-1,0,3]]
    m2 = [[7,0,0],[0,0,0],[0,0,1]]
    assert sol.multiply(m1, m2) == [[7,0,0],[-7,0,3]], "test 1 failed"
    print("✓ sparse-matrix-multiplication passed")

if __name__ == "__main__":
    test()
