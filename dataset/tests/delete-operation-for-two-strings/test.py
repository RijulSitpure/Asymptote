import sys

class Solution:
    def minDistance(self, word1: str, word2: str) -> int:
        m, n = len(word1), len(word2)
        dp = [0] * (n + 1)
        for i in range(1, m + 1):
            prev = 0
            for j in range(1, n + 1):
                temp = dp[j]
                if word1[i - 1] == word2[j - 1]:
                    dp[j] = prev + 1
                else:
                    dp[j] = max(dp[j], dp[j - 1])
                prev = temp
        return m + n - 2 * dp[n]

def test():
    sol = Solution()
    assert sol.minDistance("sea", "eat") == 2, "test 1 failed"
    assert sol.minDistance("leetcode", "etco") == 4, "test 2 failed"
    print("✓ delete-operation-for-two-strings passed")

if __name__ == "__main__":
    test()
