import sys
from typing import List

class Solution:
    def minCost(self, costs: List[List[int]]) -> int:
        r, b, g = 0, 0, 0
        for cr, cb, cg in costs:
            nr = cr + min(b, g)
            nb = cb + min(r, g)
            ng = cg + min(r, b)
            r, b, g = nr, nb, ng
        return min(r, b, g)

def test():
    sol = Solution()
    assert sol.minCost([[17,2,17],[16,16,5],[14,3,19]]) == 10, "test 1 failed"
    assert sol.minCost([[7,6,2]]) == 2, "test 2 failed"
    print("✓ paint-house passed")

if __name__ == "__main__":
    test()
