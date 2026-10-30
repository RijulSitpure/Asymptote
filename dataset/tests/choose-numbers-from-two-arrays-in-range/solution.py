import collections
from typing import List

class Solution:
    def countSubranges(self, nums1: List[int], nums2: List[int]) -> int:
        MOD = 10**9 + 7
        dp = collections.defaultdict(int)
        ans = 0
        for x, y in zip(nums1, nums2):
            next_dp = collections.defaultdict(int)
            next_dp[x] = (next_dp[x] + 1) % MOD
            next_dp[-y] = (next_dp[-y] + 1) % MOD
            for s, count in dp.items():
                next_dp[s + x] = (next_dp[s + x] + count) % MOD
                next_dp[s - y] = (next_dp[s - y] + count) % MOD
            ans = (ans + next_dp[0]) % MOD
            dp = next_dp
        return ans
