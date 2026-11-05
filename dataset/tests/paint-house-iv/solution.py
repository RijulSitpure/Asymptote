class Solution:
    def minCost(self, n: int, cost: list[list[int]]) -> int:
        half = n // 2
        dp = [[float('inf')] * 3 for _ in range(3)]
        for c1 in range(3):
            for c2 in range(3):
                if c1 != c2:
                    dp[c1][c2] = cost[0][c1] + cost[n - 1][c2]
                    
        for i in range(1, half):
            next_dp = [[float('inf')] * 3 for _ in range(3)]
            for c1 in range(3):
                for c2 in range(3):
                    if c1 == c2:
                        continue
                    c_add = cost[i][c1] + cost[n - 1 - i][c2]
                    best_prev = float('inf')
                    for p1 in range(3):
                        if p1 == c1:
                            continue
                        for p2 in range(3):
                            if p2 == c2:
                                continue
                            if dp[p1][p2] < best_prev:
                                best_prev = dp[p1][p2]
                    next_dp[c1][c2] = best_prev + c_add
            dp = next_dp
            
        return min(dp[c1][c2] for c1 in range(3) for c2 in range(3))
