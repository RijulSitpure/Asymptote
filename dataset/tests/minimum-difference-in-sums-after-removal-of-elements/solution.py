import heapq
from typing import List

class Solution:
    def minimumDifference(self, nums: List[int]) -> int:
        n = len(nums) // 3
        left = [0] * (len(nums))
        max_h = []
        cur_sum = 0
        for i in range(len(nums)):
            heapq.heappush(max_h, -nums[i])
            cur_sum += nums[i]
            if len(max_h) > n:
                cur_sum += heapq.heappop(max_h)
            if len(max_h) == n:
                left[i] = cur_sum
                
        right = [0] * (len(nums))
        min_h = []
        cur_sum = 0
        for i in range(len(nums) - 1, -1, -1):
            heapq.heappush(min_h, nums[i])
            cur_sum += nums[i]
            if len(min_h) > n:
                cur_sum -= heapq.heappop(min_h)
            if len(min_h) == n:
                right[i] = cur_sum
                
        ans = float('inf')
        for i in range(n - 1, 2 * n):
            ans = min(ans, left[i] - right[i + 1])
        return ans
