class Solution:
    def superEggDrop(self, k: int, n: int) -> int:
        dp = [0] * (k + 1)
        m = 0
        while dp[k] < n:
            m += 1
            for e in range(k, 0, -1):
                dp[e] = dp[e - 1] + dp[e] + 1
        return m

def test():
    sol = Solution()
    assert sol.superEggDrop(1, 2) == 2, "test 1 failed"
    assert sol.superEggDrop(2, 6) == 3, "test 2 failed"
    assert sol.superEggDrop(3, 14) == 4, "test 3 failed"
    print("✓ super-egg-drop passed")

if __name__ == "__main__":
    test()
