from typing import List

class Solution:
    def largestSumOfAverages(self, nums: List[int], k: int) -> float:
        n = len(nums)
        prefix = [0] * (n + 1)
        for i in range(n):
            prefix[i + 1] = prefix[i] + nums[i]

        dp = [prefix[i] / i if i > 0 else 0.0 for i in range(n + 1)]

        for p in range(2, k + 1):
            new_dp = [0.0] * (n + 1)
            for i in range(p, n + 1):
                for j in range(p - 1, i):
                    avg = (prefix[i] - prefix[j]) / (i - j)
                    cand = dp[j] + avg
                    if cand > new_dp[i]:
                        new_dp[i] = cand
            dp = new_dp

        return dp[n]

def test():
    sol = Solution()
    assert abs(sol.largestSumOfAverages([9, 1, 2, 3, 9], 3) - 20.0) < 1e-5, "test 1 failed"
    assert abs(sol.largestSumOfAverages([1, 2, 3, 4, 5, 6, 7], 4) - 20.5) < 1e-5, "test 2 failed"
    print("✓ largest-sum-of-averages passed")

if __name__ == "__main__":
    test()
