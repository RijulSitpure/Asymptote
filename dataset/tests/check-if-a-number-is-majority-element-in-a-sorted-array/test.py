import bisect

class Solution:
    def isMajorityElement(self, nums: list[int], target: int) -> bool:
        n = len(nums)
        idx = bisect.bisect_left(nums, target)
        return idx + n // 2 < n and nums[idx + n // 2] == target

def test():
    sol = Solution()
    assert sol.isMajorityElement([2,4,5,5,5,5,5,6,6], 5) is True, "test 1 failed"
    assert sol.isMajorityElement([10,100,101,101], 101) is False, "test 2 failed"
    print("✓ check-if-a-number-is-majority-element-in-a-sorted-array passed")

if __name__ == "__main__":
    test()
