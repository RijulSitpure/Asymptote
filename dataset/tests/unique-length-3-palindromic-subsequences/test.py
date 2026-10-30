class Solution:
    def countPalindromicSubsequence(self, s: str) -> int:
        first = {}
        last = {}
        for i, ch in enumerate(s):
            if ch not in first:
                first[ch] = i
            last[ch] = i
            
        ans = 0
        for ch in first:
            if last[ch] - first[ch] > 1:
                ans += len(set(s[first[ch] + 1 : last[ch]]))
        return ans

def test_count_palindromic_subsequence():
    sol = Solution()
    assert sol.countPalindromicSubsequence("aabca") == 3
    assert sol.countPalindromicSubsequence("adc") == 0
    assert sol.countPalindromicSubsequence("bbcbaba") == 4

