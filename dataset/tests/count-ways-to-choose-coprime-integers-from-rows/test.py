import math
from collections import defaultdict

class Solution:
    def countCoprimeSelections(self, grid: list[list[int]]) -> int:
        # Choose one element from each row such that gcd of all chosen elements equals 1
        # dp[g]: number of ways prefix selection has greatest common divisor g
        MOD = 1_000_000_007
        dp = defaultdict(int)
        for x in grid[0]:
            dp[x] = (dp[x] + 1) % MOD
            
        for row in grid[1:]:
            next_dp = defaultdict(int)
            for g, ways in dp.items():
                for x in row:
                    new_g = math.gcd(g, x)
                    next_dp[new_g] = (next_dp[new_g] + ways) % MOD
            dp = next_dp
            
        return dp.get(1, 0)

def run_tests():
    sol = Solution()
    # row 0: [2, 3], row 1: [4, 5]
    # pairs: (2, 4)->gcd 2, (2, 5)->gcd 1, (3, 4)->gcd 1, (3, 5)->gcd 1 -> 3 ways
    assert sol.countCoprimeSelections([[2, 3], [4, 5]]) == 3
    assert sol.countCoprimeSelections([[2], [4]]) == 0 # gcd is 2, not 1
    assert sol.countCoprimeSelections([[1], [10]]) == 1
    print("All tests passed for 3725.")

if __name__ == "__main__":
    run_tests()