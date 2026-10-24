from typing import List

class Solution:
    def numFactoredBinaryTrees(self, arr: List[int]) -> int:
        MOD = 10**9 + 7
        arr.sort()
        dp = {x: 1 for x in arr}

        for i, x in enumerate(arr):
            for j in range(i):
                y = arr[j]
                if x % y == 0 and (x // y) in dp:
                    dp[x] = (dp[x] + dp[y] * dp[x // y]) % MOD

        return sum(dp.values()) % MOD

def test():
    sol = Solution()
    assert sol.numFactoredBinaryTrees([2, 4]) == 3, "test 1 failed"
    assert sol.numFactoredBinaryTrees([2, 4, 5, 10]) == 7, "test 2 failed"
    print("✓ binary-trees-with-factors passed")

if __name__ == "__main__":
    test()
