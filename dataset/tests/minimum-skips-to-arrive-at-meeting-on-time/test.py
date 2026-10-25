class Solution:
    def minSkips(self, dist: list[int], speed: int, hoursBefore: int) -> int:
        n = len(dist)
        INF = float('inf')
        dp = [INF] * (n + 1)
        dp[0] = 0

        for d in dist[:-1]:
            next_dp = [INF] * (n + 1)
            for j in range(n + 1):
                if dp[j] == INF:
                    continue
                no_skip = ((dp[j] + d + speed - 1) // speed) * speed
                if no_skip < next_dp[j]:
                    next_dp[j] = no_skip
                if j + 1 <= n:
                    with_skip = dp[j] + d
                    if with_skip < next_dp[j + 1]:
                        next_dp[j + 1] = with_skip
            dp = next_dp

        last_d = dist[-1]
        target = hoursBefore * speed
        for j in range(n + 1):
            if dp[j] + last_d <= target:
                return j

        return -1

def test():
    sol = Solution()
    assert sol.minSkips([1,3,2], 4, 2) == 1
    assert sol.minSkips([7,3,5,5], 2, 10) == 2
    assert sol.minSkips([7,3,5,5], 1, 10) == -1

if __name__ == '__main__':
    test()
