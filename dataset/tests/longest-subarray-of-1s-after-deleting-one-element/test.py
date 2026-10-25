class Solution:
    def longestSubarray(self, nums: list[int]) -> int:
        left = 0
        zero_count = 0
        ans = 0
        for right in range(len(nums)):
            if nums[right] == 0:
                zero_count += 1
            while zero_count > 1:
                if nums[left] == 0:
                    zero_count -= 1
                left += 1
            ans = max(ans, right - left)
        return ans

def test():
    sol = Solution()
    assert sol.longestSubarray([1,1,0,1]) == 3, "test 1 failed"
    assert sol.longestSubarray([0,1,1,1,0,1,1,0,1]) == 5, "test 2 failed"
    assert sol.longestSubarray([1,1,1]) == 2, "test 3 failed"
    print("✓ longest-subarray-of-1s-after-deleting-one-element passed")

if __name__ == "__main__":
    test()
