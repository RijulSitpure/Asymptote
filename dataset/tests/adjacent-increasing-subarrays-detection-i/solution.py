class Solution:
    def hasIncreasingSubarrays(self, nums: list[int], k: int) -> bool:
        n = len(nums)
        if 2 * k > n:
            return False
        
        runs = []
        curr = 1
        for i in range(1, n):
            if nums[i] > nums[i - 1]:
                curr += 1
            else:
                runs.append(curr)
                curr = 1
        runs.append(curr)
        
        for L in runs:
            if L >= 2 * k:
                return True
        for i in range(len(runs) - 1):
            if runs[i] >= k and runs[i + 1] >= k:
                return True
        return False
