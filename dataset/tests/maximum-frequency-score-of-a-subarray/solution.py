from collections import Counter

class Solution:
    def maxFrequencyScore(self, nums: list[int], k: int) -> int:
        MOD = 10**9 + 7
        counts = Counter()
        cur_score = 0
        
        def add_val(x):
            nonlocal cur_score
            c = counts[x]
            if c > 0:
                cur_score = (cur_score - pow(x, c, MOD) + MOD) % MOD
            counts[x] += 1
            cur_score = (cur_score + pow(x, c + 1, MOD)) % MOD
            
        def remove_val(x):
            nonlocal cur_score
            c = counts[x]
            cur_score = (cur_score - pow(x, c, MOD) + MOD) % MOD
            counts[x] -= 1
            if counts[x] > 0:
                cur_score = (cur_score + pow(x, c - 1, MOD)) % MOD
                
        for i in range(k):
            add_val(nums[i])
        ans = cur_score
        for i in range(k, len(nums)):
            add_val(nums[i])
            remove_val(nums[i - k])
            ans = max(ans, cur_score)
        return ans
