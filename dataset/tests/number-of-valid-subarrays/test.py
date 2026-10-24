from typing import List

class Solution:
    def validSubarrays(self, nums: List[int]) -> int:
        stack = []
        res = 0
        for i, x in enumerate(nums):
            while stack and nums[stack[-1]] > x:
                prev = stack.pop()
                res += i - prev
            stack.append(i)
        n = len(nums)
        while stack:
            prev = stack.pop()
            res += n - prev
        return res

def test():
    sol = Solution()
    assert sol.validSubarrays([1,4,2,5,3]) == 11, "test 1 failed"
    assert sol.validSubarrays([3,2,1]) == 3, "test 2 failed"
    assert sol.validSubarrays([2,2,2]) == 6, "test 3 failed"
    print("✓ number-of-valid-subarrays passed")

if __name__ == "__main__":
    test()
