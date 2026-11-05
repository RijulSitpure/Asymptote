class Solution:
    def maxScore(self, grid: list[list[int]]) -> int:
        from collections import defaultdict
        val_rows = defaultdict(list)
        for r, row in enumerate(grid):
            for v in set(row):
                val_rows[v].append(r)
                
        vals = sorted(val_rows.keys(), reverse=True)
        m = len(grid)
        # dp[mask] = max score using a subset of rows
        dp = {0: 0}
        
        for v in vals:
            rows = val_rows[v]
            next_dp = dict(dp)
            for mask, score in dp.items():
                for r in rows:
                    if not (mask & (1 << r)):
                        new_mask = mask | (1 << r)
                        new_score = score + v
                        if new_score > next_dp.get(new_mask, -1):
                            next_dp[new_mask] = new_score
            dp = next_dp
            
        return max(dp.values())
