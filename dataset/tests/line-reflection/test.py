import sys
from typing import List

class Solution:
    def isReflected(self, points: List[List[int]]) -> bool:
        point_set = set(map(tuple, points))
        min_x = min(x for x, y in point_set)
        max_x = max(x for x, y in point_set)
        double_mid = min_x + max_x
        return all((double_mid - x, y) in point_set for x, y in point_set)

def test():
    sol = Solution()
    assert sol.isReflected([[1, 1], [-1, 1]]) is True, "test 1 failed"
    assert sol.isReflected([[1, 1], [-1, -1]]) is False, "test 2 failed"
    print("✓ line-reflection passed")

if __name__ == "__main__":
    test()
