class Solution:
    def squareFreeSubsets(self, nums: list[int]) -> int:
        primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]
        MOD = 10**9 + 7
        masks = []
        ones = 0
        for x in nums:
            if x == 1:
                ones += 1
                continue
            mask = 0
            valid = True
            for i, p in enumerate(primes):
                if x % (p * p) == 0:
                    valid = False
                    break
                if x % p == 0:
                    mask |= (1 << i)
            if valid:
                masks.append(mask)
        dp = [0] * (1 << 10)
        dp[0] = 1
        for mask in masks:
            for state in range((1 << 10) - 1, -1, -1):
                if (state & mask) == 0 and dp[state] > 0:
                    dp[state | mask] = (dp[state | mask] + dp[state]) % MOD
        ans = (sum(dp) * pow(2, ones, MOD) - 1) % MOD
        return ans
