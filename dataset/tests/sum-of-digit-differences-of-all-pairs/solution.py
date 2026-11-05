class Solution:
    def sumDigitDifferences(self, nums: list[int]) -> int:
        n = len(nums)
        m = len(str(nums[0]))
        ans = 0
        for _ in range(m):
            cnt = [0] * 10
            for i in range(n):
                cnt[nums[i] % 10] += 1
                nums[i] //= 10
            for d in range(10):
                ans += cnt[d] * (n - cnt[d])
        return ans // 2