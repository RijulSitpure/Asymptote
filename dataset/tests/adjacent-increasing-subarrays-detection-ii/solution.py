class Solution:
    def maxIncreasingSubarrays(self, nums: list[int]) -> int:
        n = len(nums)
        runs = []
        curr = 1
        for i in range(1, n):
            if nums[i] > nums[i - 1]:
                curr += 1
            else:
                runs.append(curr)
                curr = 1
        runs.append(curr)
        
        ans = 0
        for L in runs:
            ans = max(ans, L // 2)
        for i in range(len(runs) - 1):
            ans = max(ans, min(runs[i], runs[i + 1]))
            
        return ans
