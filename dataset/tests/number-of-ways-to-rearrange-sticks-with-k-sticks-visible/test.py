class Solution:
    def rearrangeSticks(self, n: int, k: int) -> int:
        MOD = 10**9 + 7
        dp = [0] * (k + 1)
        dp[1] = 1

        for i in range(2, n + 1):
            next_dp = [0] * (k + 1)
            for j in range(1, min(i, k) + 1):
                next_dp[j] = (dp[j - 1] + (i - 1) * dp[j]) % MOD
            dp = next_dp

        return dp[k]

def test():
    sol = Solution()
    assert sol.rearrangeSticks(3, 2) == 3
    assert sol.rearrangeSticks(5, 5) == 1
    assert sol.rearrangeSticks(20, 11) == 647427950

if __name__ == '__main__':
    test()
