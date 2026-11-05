class Solution:
    def maxSubarraySum(self, nums: list[int], k: int) -> int:
        n = len(nums)
        min_prefix = [float('inf')] * k
        min_prefix[(k - 1) % k] = 0
        
        max_sum = -float('inf')
        curr_sum = 0
        
        for i in range(n):
            curr_sum += nums[i]
            rem = i % k
            if min_prefix[rem] != float('inf'):
                candidate = curr_sum - min_prefix[rem]
                if candidate > max_sum:
                    max_sum = candidate
            if curr_sum < min_prefix[rem]:
                min_prefix[rem] = curr_sum
                
        return max_sum
