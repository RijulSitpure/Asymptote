class Solution:
    def numberOfSpecialSubstrings(self, s: str) -> int:
        cnt = [0] * 26
        ans = 0
        j = 0
        for i, char in enumerate(s):
            idx = ord(char) - ord('a')
            cnt[idx] += 1
            while cnt[idx] > 1:
                cnt[ord(s[j]) - ord('a')] -= 1
                j += 1
            ans += (i - j + 1)
        return ans
