from typing import List

class Solution:
    def buildWall(self, height: int, width: int, bricks: List[int]) -> int:
        MOD = 10**9 + 7
        rows = []
        def dfs(w, mask):
            if w == width:
                rows.append(mask)
                return
            for b in bricks:
                if w + b <= width:
                    next_mask = mask if w + b == width else mask | (1 << (w + b))
                    dfs(w + b, next_mask)
        dfs(0, 0)
        
        adj = [[] for _ in range(len(rows))]
        for i in range(len(rows)):
            for j in range(len(rows)):
                if not (rows[i] & rows[j]):
                    adj[i].append(j)
                    
        dp = [1] * len(rows)
        for _ in range(height - 1):
            next_dp = [0] * len(rows)
            for i in range(len(rows)):
                for j in adj[i]:
                    next_dp[j] = (next_dp[j] + dp[i]) % MOD
            dp = next_dp
        return sum(dp) % MOD
