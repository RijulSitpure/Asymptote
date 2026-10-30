from collections import Counter

class Solution:
    def numberOfGoodSubsets(self, nums: list[int]) -> int:
        MOD = 10**9 + 7
        primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]
        num_to_mask = {}
        for x in range(2, 31):
            if x % 4 == 0 or x % 9 == 0 or x % 25 == 0:
                continue
            mask = 0
            for i, p in enumerate(primes):
                if x % p == 0:
                    mask |= (1 << i)
            num_to_mask[x] = mask
            
        count = Counter(nums)
        dp = [0] * 1024
        dp[0] = 1
        for x, mask in num_to_mask.items():
            if count[x] == 0:
                continue
            c = count[x]
            for cur_mask in range(1023, -1, -1):
                if dp[cur_mask] and (cur_mask & mask) == 0:
                    dp[cur_mask | mask] = (dp[cur_mask | mask] + dp[cur_mask] * c) % MOD
                    
        ans = sum(dp[1:]) % MOD
        ans = (ans * pow(2, count[1], MOD)) % MOD
        return ans
