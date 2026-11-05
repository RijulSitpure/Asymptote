class Solution:
    def minimumSumSubarray(self, nums: list[int], l: int, r: int) -> int:
        n = len(nums)
        min_pos = float('inf')
        
        for length in range(l, r + 1):
            if length > n:
                break
            curr_sum = sum(nums[:length])
            if curr_sum > 0:
                min_pos = min(min_pos, curr_sum)
            for i in range(length, n):
                curr_sum += nums[i] - nums[i - length]
                if curr_sum > 0:
                    min_pos = min(min_pos, curr_sum)
                    
        return min_pos if min_pos != float('inf') else -1
