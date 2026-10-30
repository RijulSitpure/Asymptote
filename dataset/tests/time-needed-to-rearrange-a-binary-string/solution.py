class Solution:
    def secondsToRemoveOccurrences(self, s: str) -> int:
        zeros = 0
        ans = 0
        for ch in s:
            if ch == '0':
                zeros += 1
            elif zeros > 0:
                ans = max(ans + 1, zeros)
        return ans
