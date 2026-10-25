class Solution:
    def minimumMoves(self, arr: list[int]) -> int:
        n = len(arr)
        dp = [[0] * n for _ in range(n)]
        
        for i in range(n):
            dp[i][i] = 1
        for i in range(n - 1):
            dp[i][i + 1] = 1 if arr[i] == arr[i + 1] else 2
            
        for length in range(3, n + 1):
            for i in range(n - length + 1):
                j = i + length - 1
                res = dp[i + 1][j - 1] if arr[i] == arr[j] else float('inf')
                for k in range(i, j):
                    res = min(res, dp[i][k] + dp[k + 1][j])
                dp[i][j] = res
                
        return dp[0][n - 1]

def test():
    sol = Solution()
    assert sol.minimumMoves([1, 2]) == 2, "test 1 failed"
    assert sol.minimumMoves([1, 3, 4, 1, 5]) == 3, "test 2 failed"
    print("✓ palindrome-removal passed")

if __name__ == "__main__":
    test()
