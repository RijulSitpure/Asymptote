from typing import List

class Solution:
    def smallestRangeII(self, nums: List[int], k: int) -> int:
        nums.sort()
        ans = nums[-1] - nums[0]
        for i in range(len(nums) - 1):
            hi = max(nums[-1] - k, nums[i] + k)
            lo = min(nums[0] + k, nums[i + 1] - k)
            ans = min(ans, hi - lo)
        return ans

def test():
    sol = Solution()
    assert sol.smallestRangeII([1], 0) == 0, "test 1 failed"
    assert sol.smallestRangeII([0, 10], 2) == 6, "test 2 failed"
    assert sol.smallestRangeII([1, 3, 6], 3) == 3, "test 3 failed"
    print("✓ smallest-range-ii passed")

if __name__ == "__main__":
    test()
