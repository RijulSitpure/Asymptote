class Solution:
    def minimumArrayLength(self, nums: list[int]) -> int:
        m = min(nums)
        for x in nums:
            if x % m != 0:
                return 1
        cnt = nums.count(m)
        return (cnt + 1) // 2
