import math

class Solution:
    def subsequencePairCount(self, nums: list[int]) -> int:
        MOD = 1_000_000_007
        dp = {(0, 0): 1}
        
        for x in nums:
            new_dp = dict(dp)
            for (g1, g2), cnt in dp.items():
                ng1 = math.gcd(g1, x)
                key1 = (ng1, g2)
                new_dp[key1] = (new_dp.get(key1, 0) + cnt) % MOD
                
                ng2 = math.gcd(g2, x)
                key2 = (g1, ng2)
                new_dp[key2] = (new_dp.get(key2, 0) + cnt) % MOD
            dp = new_dp
            
        ans = 0
        for (g1, g2), cnt in dp.items():
            if g1 > 0 and g1 == g2:
                ans = (ans + cnt) % MOD
        return ans
