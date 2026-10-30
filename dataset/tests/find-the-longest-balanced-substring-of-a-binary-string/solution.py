class Solution:
    def findTheLongestBalancedSubstring(self, s: str) -> int:
        zeros = ones = 0
        max_len = 0
        for i, ch in enumerate(s):
            if ch == '0':
                if i > 0 and s[i - 1] == '1':
                    zeros = 1
                    ones = 0
                else:
                    zeros += 1
            else:
                ones += 1
                max_len = max(max_len, 2 * min(zeros, ones))
        return max_len
