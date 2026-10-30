from typing import List

class Solution:
    def minimumLines(self, points: List[List[int]]) -> int:
        n = len(points)
        if n <= 2:
            return 1
        lines = []
        for i in range(n):
            for j in range(i + 1, n):
                mask = (1 << i) | (1 << j)
                dx = points[j][0] - points[i][0]
                dy = points[j][1] - points[i][1]
                for k in range(n):
                    if (points[k][1] - points[i][1]) * dx == (points[k][0] - points[i][0]) * dy:
                        mask |= 1 << k
                lines.append(mask)
        lines = list(set(lines))
        
        dp = [float('inf')] * (1 << n)
        dp[0] = 0
        for mask in range(1 << n):
            if dp[mask] == float('inf'):
                continue
            first = -1
            for i in range(n):
                if not ((mask >> i) & 1):
                    first = i
                    break
            if first == -1:
                continue
            dp[mask | (1 << first)] = min(dp[mask | (1 << first)], dp[mask] + 1)
            for line_mask in lines:
                if (line_mask >> first) & 1:
                    next_mask = mask | line_mask
                    if dp[mask] + 1 < dp[next_mask]:
                        dp[next_mask] = dp[mask] + 1
        return dp[(1 << n) - 1]
