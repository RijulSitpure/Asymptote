from typing import List

class Solution:
    def smallestRangeI(self, nums: List[int], k: int) -> int:
        return max(0, max(nums) - min(nums) - 2 * k)

def test():
    sol = Solution()
    assert sol.smallestRangeI([1], 0) == 0, "test 1 failed"
    assert sol.smallestRangeI([0, 10], 2) == 6, "test 2 failed"
    assert sol.smallestRangeI([1, 3, 6], 3) == 0, "test 3 failed"
    print("✓ smallest-range-i passed")

if __name__ == "__main__":
    test()
