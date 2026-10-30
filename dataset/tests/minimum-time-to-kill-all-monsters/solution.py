import math

class Solution:
    def minimumTime(self, power: list[int]) -> int:
        n = len(power)
        total_states = 1 << n
        dp = [float('inf')] * total_states
        dp[0] = 0
        
        for mask in range(total_states):
            if dp[mask] == float('inf'):
                continue
            gain = bin(mask).count('1') + 1
            for i in range(n):
                if not (mask & (1 << i)):
                    nxt = mask | (1 << i)
                    days = math.ceil(power[i] / gain)
                    if dp[mask] + days < dp[nxt]:
                        dp[nxt] = dp[mask] + days
        return dp[total_states - 1]
