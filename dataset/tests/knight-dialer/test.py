class Solution:
    def knightDialer(self, n: int) -> int:
        MOD = 1_000_000_007
        moves = [
            [4, 6],
            [6, 8],
            [7, 9],
            [4, 8],
            [0, 3, 9],
            [],
            [0, 1, 7],
            [2, 6],
            [1, 3],
            [2, 4]
        ]
        dp = [1] * 10
        for _ in range(n - 1):
            next_dp = [0] * 10
            for curr in range(10):
                for nxt in moves[curr]:
                    next_dp[nxt] = (next_dp[nxt] + dp[curr]) % MOD
            dp = next_dp
        return sum(dp) % MOD

def test():
    sol = Solution()
    assert sol.knightDialer(1) == 10, "test 1 failed"
    assert sol.knightDialer(2) == 20, "test 2 failed"
    assert sol.knightDialer(3131) == 136006598, "test 3 failed"
    print("✓ knight-dialer passed")

if __name__ == "__main__":
    test()
