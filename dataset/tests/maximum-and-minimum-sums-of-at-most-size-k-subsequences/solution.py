class Solution:
    def minMaxSums(self, nums: list[int], k: int) -> int:
        MOD = 1_000_000_007
        nums.sort()
        n = len(nums)
        
        C = [[0] * (k + 1) for _ in range(n + 1)]
        for i in range(n + 1):
            C[i][0] = 1
            for j in range(1, min(i + 1, k + 1)):
                C[i][j] = (C[i - 1][j - 1] + C[i - 1][j]) % MOD
                
        pref_C = [[0] * (k + 1) for _ in range(n + 1)]
        for i in range(n + 1):
            s = 0
            for j in range(k + 1):
                s = (s + C[i][j]) % MOD
                pref_C[i][j] = s
                
        ans = 0
        for i in range(n):
            max_ways = pref_C[i][min(k - 1, i)]
            min_ways = pref_C[n - 1 - i][min(k - 1, n - 1 - i)]
            ans = (ans + nums[i] * (max_ways + min_ways)) % MOD
            
        return ans
