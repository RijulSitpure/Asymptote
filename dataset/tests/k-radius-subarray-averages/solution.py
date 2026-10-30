class Solution:
    def getAverages(self, nums: list[int], k: int) -> list[int]:
        n = len(nums)
        ans = [-1] * n
        window_size = 2 * k + 1

        if window_size > n:
            return ans

        curr_sum = sum(nums[:window_size])
        ans[k] = curr_sum // window_size

        for i in range(k + 1, n - k):
            curr_sum += nums[i + k] - nums[i - k - 1]
            ans[i] = curr_sum // window_size

        return ans
