from typing import List

class Solution:
    def lenLongestFibSubseq(self, arr: List[int]) -> int:
        idx = {x: i for i, x in enumerate(arr)}
        dp = {}
        ans = 0
        for i in range(len(arr)):
            for j in range(i):
                diff = arr[i] - arr[j]
                k = idx.get(diff, -1)
                if 0 <= k < j:
                    dp[j, i] = dp.get((k, j), 2) + 1
                    ans = max(ans, dp[j, i])
        return ans if ans >= 3 else 0

def test():
    sol = Solution()
    assert sol.lenLongestFibSubseq([1, 2, 3, 4, 5, 6, 7, 8]) == 5, "test 1 failed"
    assert sol.lenLongestFibSubseq([1, 3, 7, 11, 12, 14, 18]) == 3, "test 2 failed"
    print("✓ length-of-longest-fibonacci-subsequence passed")

if __name__ == "__main__":
    test()
