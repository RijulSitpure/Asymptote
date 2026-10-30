class Solution:
    def countAsterisks(self, s: str) -> int:
        inside = False
        ans = 0
        for ch in s:
            if ch == '|':
                inside = not inside
            elif not inside and ch == '*':
                ans += 1
        return ans
