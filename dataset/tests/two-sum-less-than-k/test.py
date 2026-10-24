class Solution:
    def twoSumLessThanK(self, nums: list[int], k: int) -> int:
        nums.sort()
        left, right = 0, len(nums) - 1
        max_sum = -1
        while left < right:
            curr = nums[left] + nums[right]
            if curr < k:
                max_sum = max(max_sum, curr)
                left += 1
            else:
                right -= 1
        return max_sum

def test():
    sol = Solution()
    assert sol.twoSumLessThanK([34,23,1,24,75,33,54,8], 60) == 58, "test 1 failed"
    assert sol.twoSumLessThanK([10,20,30], 15) == -1, "test 2 failed"
    print("✓ two-sum-less-than-k passed")

if __name__ == "__main__":
    test()
