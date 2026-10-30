class Solution:
    def beautifulPartitions(self, s: str, k: int, minLength: int) -> int:
        MOD = 1_000_000_007
        primes = {'2', '3', '5', '7'}
        n = len(s)
        if s[0] not in primes or s[-1] in primes:
            return 0
        if k * minLength > n:
            return 0
        dp = [0] * (n + 1)
        dp[0] = 1
        for p in range(1, k + 1):
            next_dp = [0] * (n + 1)
            running_sum = 0
            for i in range(1, n + 1):
                j = i - minLength
                if j >= 0:
                    if j == 0:
                        running_sum = (running_sum + dp[0]) % MOD
                    elif s[j - 1] not in primes and s[j] in primes:
                        running_sum = (running_sum + dp[j]) % MOD
                if i == n:
                    if p == k:
                        next_dp[i] = running_sum
                elif s[i - 1] not in primes and s[i] in primes:
                    next_dp[i] = running_sum
            dp = next_dp
        return dp[n]
