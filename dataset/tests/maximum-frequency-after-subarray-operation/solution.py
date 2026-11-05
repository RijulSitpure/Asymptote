class Solution:
    def maxFrequency(self, nums: list[int], k: int) -> int:
        base = nums.count(k)
        max_gain = 0
        
        for target in range(1, 51):
            if target == k:
                continue
            curr = 0
            best = 0
            for x in nums:
                if x == target:
                    curr += 1
                elif x == k:
                    curr -= 1
                if curr < 0:
                    curr = 0
                if curr > best:
                    best = curr
            if best > max_gain:
                max_gain = best
                
        return base + max_gain
