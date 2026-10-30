class Solution:
    def minOperations(self, nums: list[int]) -> int:
        n = len(nums)
        unique = sorted(set(nums))
        ans = n
        r = 0
        for l in range(len(unique)):
            while r < len(unique) and unique[r] <= unique[l] + n - 1:
                r += 1
            count = r - l
            ans = min(ans, n - count)
        return ans
