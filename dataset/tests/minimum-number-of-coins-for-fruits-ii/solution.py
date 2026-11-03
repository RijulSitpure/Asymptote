class Solution:
    def minimumCoins(self, prices: list[int]) -> int:
        from collections import deque
        n = len(prices)
        dp = [0] * (n + 2)
        q = deque([n + 1])
        for i in range(n, 0, -1):
            while q and q[0] > 2 * i + 1:
                q.popleft()
            dp[i] = prices[i - 1] + dp[q[0]]
            while q and dp[q[-1]] >= dp[i]:
                q.pop()
            q.append(i)
        return dp[1]
