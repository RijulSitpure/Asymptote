from collections import Counter

class Solution:
    def getLargestOutlier(self, nums: list[int]) -> int:
        total_sum = sum(nums)
        freq = Counter(nums)
        max_outlier = -float('inf')
        
        for x in nums:
            freq[x] -= 1
            rem = total_sum - x
            if rem % 2 == 0:
                target = rem // 2
                if freq[target] > 0:
                    if x > max_outlier:
                        max_outlier = x
            freq[x] += 1
            
        return max_outlier
