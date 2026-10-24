from typing import List

class Solution:
    def missingElement(self, nums: List[int], k: int) -> int:
        def missing(i: int) -> int:
            return (nums[i] - nums[0]) - i

        n = len(nums)
        if k > missing(n - 1):
            return nums[-1] + (k - missing(n - 1))

        low, high = 0, n - 1
        while low < high:
            mid = (low + high + 1) // 2
            if missing(mid) < k:
                low = mid
            else:
                high = mid - 1
        return nums[low] + (k - missing(low))

def test():
    sol = Solution()
    assert sol.missingElement([4,7,9,10], 1) == 5, "test 1 failed"
    assert sol.missingElement([4,7,9,10], 3) == 8, "test 2 failed"
    assert sol.missingElement([1,2,4], 3) == 6, "test 3 failed"
    print("✓ missing-element-in-sorted-array passed")

if __name__ == "__main__":
    test()
