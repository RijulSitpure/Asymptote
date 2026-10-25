class Solution:
    def probabilityOfHeads(self, prob: list[float], target: int) -> float:
        dp = [0.0] * (target + 1)
        dp[0] = 1.0
        for p in prob:
            for k in range(target, -1, -1):
                dp[k] = dp[k] * (1.0 - p) + (dp[k - 1] * p if k > 0 else 0.0)
        return dp[target]

def test():
    sol = Solution()
    res1 = sol.probabilityOfHeads([0.4], 1)
    assert abs(res1 - 0.4) < 1e-5, "test 1 failed"
    res2 = sol.probabilityOfHeads([0.5, 0.5, 0.5, 0.5, 0.5], 0)
    assert abs(res2 - 0.03125) < 1e-5, "test 2 failed"
    print("✓ toss-strange-coins passed")

if __name__ == "__main__":
    test()
