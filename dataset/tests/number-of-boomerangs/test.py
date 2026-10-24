import sys
from typing import List

class Solution:
    def numberOfBoomerangs(self, points: List[List[int]]) -> int:
        total = 0
        for p in points:
            dist_map = {}
            for q in points:
                d = (p[0] - q[0]) ** 2 + (p[1] - q[1]) ** 2
                dist_map[d] = dist_map.get(d, 0) + 1
            for cnt in dist_map.values():
                total += cnt * (cnt - 1)
        return total

def test():
    sol = Solution()
    assert sol.numberOfBoomerangs([[0, 0], [1, 0], [2, 0]]) == 2, "test 1 failed"
    assert sol.numberOfBoomerangs([[1, 1], [2, 2], [3, 3]]) == 2, "test 2 failed"
    assert sol.numberOfBoomerangs([[1, 1]]) == 0, "test 3 failed"
    print("✓ number-of-boomerangs passed")

if __name__ == "__main__":
    test()
