class Solution:
    def dieSimulator(self, n: int, rollMax: list[int]) -> int:
        MOD = 10**9 + 7
        dp = [[0] * 16 for _ in range(6)]
        for f in range(6):
            dp[f][1] = 1
            
        for _ in range(n - 1):
            nxt = [[0] * 16 for _ in range(6)]
            face_sums = [sum(dp[f]) % MOD for f in range(6)]
            total_sum = sum(face_sums) % MOD
            
            for f in range(6):
                nxt[f][1] = (total_sum - face_sums[f]) % MOD
                for k in range(2, rollMax[f] + 1):
                    nxt[f][k] = dp[f][k - 1] % MOD
            dp = nxt
            
        return sum(sum(dp[f]) for f in range(6)) % MOD

def test():
    sol = Solution()
    assert sol.dieSimulator(2, [1, 1, 2, 2, 2, 3]) == 34, "test 1 failed"
    assert sol.dieSimulator(2, [1, 1, 1, 1, 1, 1]) == 30, "test 2 failed"
    assert sol.dieSimulator(3, [1, 1, 1, 2, 2, 3]) == 181, "test 3 failed"
    print("✓ dice-roll-simulation passed")

if __name__ == "__main__":
    test()
