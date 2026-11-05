class Solution:
    def resultsArray(self, nums: list[int], k: int) -> list[int]:
        if k == 1:
            return nums[:]
        n = len(nums)
        ans = []
        consec = 1
        for i in range(1, n):
            if nums[i] == nums[i - 1] + 1:
                consec += 1
            else:
                consec = 1
            if i >= k - 1:
                ans.append(nums[i] if consec >= k else -1)
        return ans
