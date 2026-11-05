class Solution:
    def countKConstraintSubstrings(self, s: str, k: int) -> int:
        n = len(s)
        ans = 0
        left = 0
        zeros, ones = 0, 0
        for right in range(n):
            if s[right] == '0':
                zeros += 1
            else:
                ones += 1
            while zeros > k and ones > k:
                if s[left] == '0':
                    zeros -= 1
                else:
                    ones -= 1
                left += 1
            ans += right - left + 1
        return ans
