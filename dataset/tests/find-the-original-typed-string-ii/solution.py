class Solution:
    def possibleStringCount(self, word: str, k: int) -> int:
        MOD = 1_000_000_007
        groups = []
        curr = 1
        for i in range(1, len(word)):
            if word[i] == word[i - 1]:
                curr += 1
            else:
                groups.append(curr)
                curr = 1
        groups.append(curr)
        
        total = 1
        for c in groups:
            total = (total * c) % MOD
            
        m = len(groups)
        if k <= m:
            return total
            
        limit = k - m - 1
        dp = [0] * (limit + 1)
        dp[0] = 1
        
        for c in groups:
            max_y = c - 1
            pref = [0] * (limit + 2)
            for j in range(limit + 1):
                pref[j + 1] = (pref[j] + dp[j]) % MOD
            new_dp = [0] * (limit + 1)
            for s in range(limit + 1):
                low = max(0, s - max_y)
                new_dp[s] = (pref[s + 1] - pref[low]) % MOD
            dp = new_dp
            
        invalid = sum(dp) % MOD
        return (total - invalid + MOD) % MOD
