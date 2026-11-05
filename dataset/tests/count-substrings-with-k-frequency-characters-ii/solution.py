class Solution:
    def numberOfSubstrings(self, s: str, k: int) -> int:
        n = len(s)
        count = [0] * 26
        ans = 0
        left = 0
        for right in range(n):
            idx = ord(s[right]) - ord('a')
            count[idx] += 1
            while count[idx] >= k:
                ans += n - right
                count[ord(s[left]) - ord('a')] -= 1
                left += 1
        return ans
