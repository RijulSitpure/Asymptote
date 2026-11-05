from bisect import bisect_left, bisect_right

class Solution:
    def maxFrequency(self, nums: list[int], k: int, numOperations: int) -> int:
        nums.sort()
        candidates = set()
        for x in nums:
            candidates.add(x)
            candidates.add(x - k)
            candidates.add(x + k)
            
        ans = 0
        for v in candidates:
            left = bisect_left(nums, v - k)
            right = bisect_right(nums, v + k)
            total_in_range = right - left
            exact = bisect_right(nums, v) - bisect_left(nums, v)
            achievable = exact + min(numOperations, total_in_range - exact)
            if achievable > ans:
                ans = achievable
                
        return ans
