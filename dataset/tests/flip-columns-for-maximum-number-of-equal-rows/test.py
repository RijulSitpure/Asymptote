from typing import List
from collections import Counter

class Solution:
    def maxEqualRowsAfterFlips(self, matrix: List[List[int]]) -> int:
        counts = Counter()
        for row in matrix:
            if row[0] == 0:
                canonical = tuple(row)
            else:
                canonical = tuple(1 - x for x in row)
            counts[canonical] += 1
        return max(counts.values())

def test():
    sol = Solution()
    assert sol.maxEqualRowsAfterFlips([[0,1],[1,1]]) == 1, "test 1 failed"
    assert sol.maxEqualRowsAfterFlips([[0,1],[1,0]]) == 2, "test 2 failed"
    assert sol.maxEqualRowsAfterFlips([[0,0,0],[0,0,1],[1,1,0]]) == 2, "test 3 failed"
    print("✓ flip-columns-for-maximum-number-of-equal-rows passed")

if __name__ == "__main__":
    test()
