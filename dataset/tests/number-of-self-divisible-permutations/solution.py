class Solution:
    def selfDivisiblePermutationCount(self, n: int) -> int:
        memo = {}
        def dfs(mask: int) -> int:
            i = bin(mask).count('1') + 1
            if i > n:
                return 1
            if mask in memo:
                return memo[mask]
            res = 0
            for j in range(1, n + 1):
                if not (mask & (1 << j)):
                    if i % j == 0 or j % i == 0:
                        res += dfs(mask | (1 << j))
            memo[mask] = res
            return res
        return dfs(0)
