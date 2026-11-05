class Solution:
    def countKReducibleNumbers(self, s: str, k: int) -> int:
        MOD = 1_000_000_007
        n = len(s)
        
        steps = [0] * (n + 1)
        for i in range(2, n + 1):
            steps[i] = steps[bin(i).count('1')] + 1
            
        valid_counts = set()
        for i in range(1, n + 1):
            if steps[i] <= k - 1:
                valid_counts.add(i)
                
        memo = {}
        def dp(idx, count, tight):
            if idx == n:
                return 1 if (not tight and count in valid_counts) else 0
            state = (idx, count, tight)
            if state in memo:
                return memo[state]
                
            limit = int(s[idx]) if tight else 1
            res = 0
            for digit in range(limit + 1):
                res = (res + dp(idx + 1, count + digit, tight and (digit == limit))) % MOD
            memo[state] = res
            return res
            
        return dp(0, 0, True)
