class Solution:
    def numberOfPermutations(self, n: int, requirements: list[list[int]]) -> int:
        MOD = 10**9 + 7
        req_map = {end: cnt for end, cnt in requirements}
        if 0 in req_map and req_map[0] != 0:
            return 0
            
        max_k = max(req_map.values())
        dp = [0] * (max_k + 1)
        dp[0] = 1
        
        for i in range(1, n):
            new_dp = [0] * (max_k + 1)
            pref = [0] * (max_k + 2)
            for k in range(max_k + 1):
                pref[k + 1] = (pref[k] + dp[k]) % MOD
            for k in range(max_k + 1):
                low = max(0, k - i)
                new_dp[k] = (pref[k + 1] - pref[low]) % MOD
            if i in req_map:
                target = req_map[i]
                for k in range(max_k + 1):
                    if k != target:
                        new_dp[k] = 0
            dp = new_dp
            
        return dp[req_map[n - 1]]