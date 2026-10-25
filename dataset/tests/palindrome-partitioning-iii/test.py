class Solution:
    def palindromePartition(self, s: str, k: int) -> int:
        n = len(s)
        cost = [[0] * n for _ in range(n)]
        for length in range(2, n + 1):
            for i in range(n - length + 1):
                j = i + length - 1
                cost[i][j] = cost[i + 1][j - 1] + (0 if s[i] == s[j] else 1)
                
        dp = [cost[0][j] for j in range(n)]
        
        for p in range(2, k + 1):
            nxt = [float('inf')] * n
            for j in range(p - 1, n):
                for i in range(p - 1, j + 1):
                    nxt[j] = min(nxt[j], dp[i - 1] + cost[i][j])
            dp = nxt
            
        return dp[n - 1]

def test():
    sol = Solution()
    assert sol.palindromePartition("abc", 2) == 1, "test 1 failed"
    assert sol.palindromePartition("aabbc", 3) == 0, "test 2 failed"
    assert sol.palindromePartition("leetcode", 8) == 0, "test 3 failed"
    print("✓ palindrome-partitioning-iii passed")

if __name__ == "__main__":
    test()
