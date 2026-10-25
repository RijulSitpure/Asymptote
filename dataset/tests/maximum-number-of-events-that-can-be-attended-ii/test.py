import bisect

class Solution:
    def maxValue(self, events: list[list[int]], k: int) -> int:
        events.sort(key=lambda x: x[1])
        n = len(events)
        ends = [e[1] for e in events]
        dp = [[0] * (k + 1) for _ in range(n + 1)]

        for i in range(1, n + 1):
            start, end, val = events[i - 1]
            p = bisect.bisect_left(ends, start)
            for j in range(1, k + 1):
                dp[i][j] = max(dp[i - 1][j], dp[p][j - 1] + val)

        return dp[n][k]

def test():
    sol = Solution()
    assert sol.maxValue([[1,2,4],[3,4,3],[2,3,1]], 2) == 7
    assert sol.maxValue([[1,2,4],[3,4,3],[2,3,10]], 2) == 10
    assert sol.maxValue([[1,1,1],[2,2,2],[3,3,3],[4,4,4]], 3) == 9

    print("✓ maximum-number-of-events-that-can-be-attended-ii passed")

if __name__ == '__main__':
    test()
