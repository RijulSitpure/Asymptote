class Solution:
    def numSubseq(self, nums: list[int], target: int) -> int:
        MOD = 10**9 + 7
        nums.sort()
        left, right = 0, len(nums) - 1
        ans = 0
        while left <= right:
            if nums[left] + nums[right] <= target:
                ans = (ans + pow(2, right - left, MOD)) % MOD
                left += 1
            else:
                right -= 1
        return ans

def test():
    sol = Solution()
    assert sol.numSubseq([3,5,6,7], 9) == 4, "test 1 failed"
    assert sol.numSubseq([3,3,6,8], 10) == 6, "test 2 failed"
    assert sol.numSubseq([2,3,3,4,6,7], 12) == 61, "test 3 failed"
    print("✓ number-of-subsequences-that-satisfy-the-given-sum-condition passed")

if __name__ == "__main__":
    test()
