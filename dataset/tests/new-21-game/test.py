class Solution:
    def new21Game(self, n: int, k: int, maxPts: int) -> float:
        if k == 0 or n >= k + maxPts:
            return 1.0
        dp = [0.0] * (n + 1)
        dp[0] = 1.0
        window_sum = 1.0
        ans = 0.0
        for i in range(1, n + 1):
            dp[i] = window_sum / maxPts
            if i < k:
                window_sum += dp[i]
            else:
                ans += dp[i]
            if i - maxPts >= 0:
                window_sum -= dp[i - maxPts]
        return ans

def test():
    sol = Solution()
    assert abs(sol.new21Game(10, 1, 10) - 1.0) < 1e-5, "test 1 failed"
    assert abs(sol.new21Game(6, 1, 10) - 0.6) < 1e-5, "test 2 failed"
    assert abs(sol.new21Game(21, 17, 10) - 0.73278) < 1e-4, "test 3 failed"
    print("✓ new-21-game passed")

if __name__ == "__main__":
    test()
