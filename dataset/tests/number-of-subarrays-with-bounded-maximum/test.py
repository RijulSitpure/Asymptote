from typing import List

class Solution:
    def numSubarrayBoundedMax(self, nums: List[int], left: int, right: int) -> int:
        def at_most(bound: int) -> int:
            ans = 0
            cur = 0
            for x in nums:
                cur = cur + 1 if x <= bound else 0
                ans += cur
            return ans

        return at_most(right) - at_most(left - 1)

def test():
    sol = Solution()
    assert sol.numSubarrayBoundedMax([2, 1, 4, 3], 2, 3) == 3, "test 1 failed"
    assert sol.numSubarrayBoundedMax([2, 9, 2, 5, 6], 2, 8) == 7, "test 2 failed"
    print("✓ number-of-subarrays-with-bounded-maximum passed")

if __name__ == "__main__":
    test()
