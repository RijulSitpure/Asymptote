import sys
from typing import List

class Solution:
    def minPatches(self, nums: List[int], n: int) -> int:
        patches = 0
        miss = 1
        i = 0
        while miss <= n:
            if i < len(nums) and nums[i] <= miss:
                miss += nums[i]
                i += 1
            else:
                miss += miss
                patches += 1
        return patches

def test():
    sol = Solution()
    assert sol.minPatches([1, 3], 6) == 1, "test 1 failed"
    assert sol.minPatches([1, 5, 10], 20) == 2, "test 2 failed"
    assert sol.minPatches([1, 2, 2], 5) == 0, "test 3 failed"
    print("✓ patching-array passed")

if __name__ == "__main__":
    test()
