import sys
from typing import List

class Solution:
    def minCostII(self, costs: List[List[int]]) -> int:
        if not costs:
            return 0
        prev_min1, prev_min2, prev_idx = 0, 0, -1
        for row in costs:
            curr_min1, curr_min2, curr_idx = float("inf"), float("inf"), -1
            for c, cost in enumerate(row):
                val = cost + (prev_min2 if c == prev_idx else prev_min1)
                if val < curr_min1:
                    curr_min2 = curr_min1
                    curr_min1 = val
                    curr_idx = c
                elif val < curr_min2:
                    curr_min2 = val
            prev_min1, prev_min2, prev_idx = curr_min1, curr_min2, curr_idx
        return prev_min1

def test():
    sol = Solution()
    assert sol.minCostII([[1, 5, 3], [2, 9, 4]]) == 5, "test 1 failed"
    assert sol.minCostII([[1, 3], [2, 4]]) == 5, "test 2 failed"
    print("✓ paint-house-ii passed")

if __name__ == "__main__":
    test()
