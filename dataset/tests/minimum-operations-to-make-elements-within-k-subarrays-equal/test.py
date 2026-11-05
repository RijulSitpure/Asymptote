class Solution:
    def minOperations(self, nums: list[int], x: int, k: int) -> int:
        n = len(nums)
        costs = []
        for i in range(n - x + 1):
            sub = sorted(nums[i:i + x])
            med = sub[x // 2]
            costs.append(sum(abs(v - med) for v in sub))

        inf = float('inf')
        dp = [[inf] * (k + 1) for _ in range(n + 1)]
        dp[0][0] = 0
        for i in range(1, n + 1):
            for j in range(k + 1):
                dp[i][j] = dp[i - 1][j]
                if j > 0 and i >= x and dp[i - x][j - 1] != inf:
                    dp[i][j] = min(dp[i][j], dp[i - x][j - 1] + costs[i - x])
        return int(dp[n][k])

def run_tests():
    s = Solution()
    assert s.minOperations([1, 3, 2, 6, 4, 2], 3, 2) == 6
    assert s.minOperations([5, 5, 5], 1, 3) == 0
    print("All tests passed for minimum-operations-to-make-elements-within-k-subarrays-equal")

if __name__ == '__main__':
    run_tests()
