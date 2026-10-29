import math

class Solution:
    def getProbability(self, balls: list[int]) -> float:
        k = len(balls)
        n = sum(balls) // 2
        memo = {}
        def dfs(i, count1, d1, d2):
            if count1 > n: return 0, 0
            if i == k:
                if count1 == n:
                    return (1 if d1 == d2 else 0), 1
                return 0, 0
            state = (i, count1, d1, d2)
            if state in memo: return memo[state]
            valid_ways, total_ways = 0, 0
            b = balls[i]
            for c in range(b + 1):
                ways = math.comb(b, c)
                nd1 = d1 + (1 if c > 0 else 0)
                nd2 = d2 + (1 if b - c > 0 else 0)
                v, t = dfs(i + 1, count1 + c, nd1, nd2)
                valid_ways += v * ways
                total_ways += t * ways
            memo[state] = (valid_ways, total_ways)
            return valid_ways, total_ways
        valid, total = dfs(0, 0, 0, 0)
        return valid / total

sol = Solution()
assert abs(sol.getProbability([1,1]) - 1.0) < 1e-5
assert abs(sol.getProbability([2,1,1]) - 0.66667) < 1e-4
print("All tests passed successfully.")
