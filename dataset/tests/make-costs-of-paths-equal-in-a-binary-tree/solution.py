class Solution:
    def minIncrements(self, n: int, cost: list[int]) -> int:
        ans = 0
        for i in range(n // 2 - 1, -1, -1):
            left = 2 * i + 1
            right = 2 * i + 2
            ans += abs(cost[left] - cost[right])
            cost[i] += max(cost[left], cost[right])
        return ans
