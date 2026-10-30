class Solution:
    def maxPalindromes(self, s: str, k: int) -> int:
        n = len(s)
        ans = 0
        last_end = 0
        for i in range(n):
            if i - k + 1 >= last_end and s[i - k + 1:i + 1] == s[i - k + 1:i + 1][::-1]:
                ans += 1
                last_end = i + 1
            elif i - k >= last_end and s[i - k:i + 1] == s[i - k:i + 1][::-1]:
                ans += 1
                last_end = i + 1
        return ans
