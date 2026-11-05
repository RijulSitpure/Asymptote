class Solution:
    def colorWays(self, n: int) -> int:
        if n == 1:
            return 3
        if n == 2:
            return 6
        
        MOD = 1_000_000_007
        power_of_two = pow(2, n, MOD)
        if n % 2 == 0:
            return (power_of_two + 2) % MOD
        else:
            return (power_of_two - 2 + MOD) % MOD

def run_tests():
    sol = Solution()
    assert sol.colorWays(3) == 6 # Triangle cycle: 3 * 2 * 1 = 6
    assert sol.colorWays(4) == 18 # 2^4 + 2 = 18
    assert sol.colorWays(2) == 6
    print("All tests passed for 3802.")

if __name__ == "__main__":
    run_tests()
