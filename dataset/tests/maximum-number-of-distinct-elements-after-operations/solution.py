class Solution:
    def maxDistinctElements(self, nums: list[int], k: int) -> int:
        nums.sort()
        next_available = -float('inf')
        distinct_count = 0
        
        for num in nums:
            left = num - k
            right = num + k
            target = max(left, next_available)
            if target <= right:
                distinct_count += 1
                next_available = target + 1
                
        return distinct_count
