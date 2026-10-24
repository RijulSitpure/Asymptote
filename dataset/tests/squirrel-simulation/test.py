import sys
from typing import List

class Solution:
    def minDistance(self, height: int, width: int, tree: List[int], squirrel: List[int], nuts: List[List[int]]) -> int:
        def dist(p1, p2):
            return abs(p1[0] - p2[0]) + abs(p1[1] - p2[1])
        tot_dist = sum(2 * dist(nut, tree) for nut in nuts)
        max_save = max(dist(nut, tree) - dist(nut, squirrel) for nut in nuts)
        return tot_dist - max_save

def test():
    sol = Solution()
    assert sol.minDistance(5, 7, [2,2], [4,4], [[3,0], [2,5]]) == 12, "test 1 failed"
    print("✓ squirrel-simulation passed")

if __name__ == "__main__":
    test()
