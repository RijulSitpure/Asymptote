from typing import List

class Solution:
    def maxSumAfterPartitioning(self, arr: List[int], k: int) -> int:
        n = len(arr)
        dp = [0] * (n + 1)
        for i in range(1, n + 1):
            cur_max = 0
            for j in range(1, min(k, i) + 1):
                cur_max = max(cur_max, arr[i - j])
                dp[i] = max(dp[i], dp[i - j] + cur_max * j)
        return dp[n]

def test():
    sol = Solution()
    assert sol.maxSumAfterPartitioning([1,15,7,9,2,5,10], 3) == 84, "test 1 failed"
    assert sol.maxSumAfterPartitioning([1,4,1,5,7,3,6,1,9,9,3], 4) == 83, "test 2 failed"
    print("✓ partition-array-for-maximum-sum passed")

if __name__ == "__main__":
    test()
