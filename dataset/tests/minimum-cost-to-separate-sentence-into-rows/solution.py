class Solution:
    def minimumCost(self, sentence: str, k: int) -> int:
        words = sentence.split()
        n = len(words)
        lens = [len(w) for w in words]

        memo = {}

        def dfs(i: int) -> int:
            if i == n:
                return 0
            if i in memo:
                return memo[i]

            res = float('inf')
            curr_len = -1
            for j in range(i, n):
                curr_len += lens[j] + 1
                if curr_len > k:
                    break
                row_cost = 0 if j == n - 1 else (k - curr_len) ** 2
                res = min(res, row_cost + dfs(j + 1))

            memo[i] = res
            return res

        return dfs(0)
