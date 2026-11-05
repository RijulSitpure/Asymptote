
class Solution:
    def longestPalindromeSubsequence(self, s: str, k: int) -> int:
        memo = {}

        def dfs(i: int, j: int, rem_k: int) -> int:
            if i > j:
                return 0
            if i == j:
                return 1
            state = (i, j, rem_k)
            if state in memo:
                return memo[state]
            res = max(dfs(i + 1, j, rem_k), dfs(i, j - 1, rem_k))
            diff = abs(ord(s[i]) - ord(s[j]))
            cost = min(diff, 26 - diff)
            if rem_k >= cost:
                res = max(res, 2 + dfs(i + 1, j - 1, rem_k - cost))
            memo[state] = res
            return res

        return dfs(0, len(s) - 1, k)

def test_longest_palindromic_subsequence_after_at_most_k_operations():
    sol = Solution()
    assert sol.longestPalindromeSubsequence("abced", 2) == 3
    assert sol.longestPalindromeSubsequence("aaazzz", 4) == 6

if __name__ == '__main__':
    test_longest_palindromic_subsequence_after_at_most_k_operations()
    print('All tests passed.')
