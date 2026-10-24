import sys
from typing import List

class Solution:
    def nthSuperUglyNumber(self, n: int, primes: List[int]) -> int:
        dp = [1] * n
        k = len(primes)
        indices = [0] * k
        for i in range(1, n):
            next_val = min(dp[indices[j]] * primes[j] for j in range(k))
            dp[i] = next_val
            for j in range(k):
                if dp[indices[j]] * primes[j] == next_val:
                    indices[j] += 1
        return dp[-1]

def test():
    sol = Solution()
    assert sol.nthSuperUglyNumber(12, [2, 7, 13, 19]) == 32, "test 1 failed"
    assert sol.nthSuperUglyNumber(1, [2, 3, 5]) == 1, "test 2 failed"
    print("✓ super-ugly-number passed")

if __name__ == "__main__":
    test()
