class Solution:
    def greatestLetter(self, s: str) -> str:
        seen = set(s)
        for code in range(ord('Z'), ord('A') - 1, -1):
            upper = chr(code)
            lower = chr(code + 32)
            if upper in seen and lower in seen:
                return upper
        return ""
