class Solution:
    def makePalindrome(self, s: str) -> bool:
        mismatches = 0
        left, right = 0, len(s) - 1
        while left < right:
            if s[left] != s[right]:
                mismatches += 1
                if mismatches > 2:
                    return False
            left += 1
            right -= 1
        return True
