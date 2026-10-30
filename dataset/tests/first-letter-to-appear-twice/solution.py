class Solution:
    def repeatedCharacter(self, s: str) -> str:
        mask = 0
        for ch in s:
            bit = 1 << (ord(ch) - ord('a'))
            if mask & bit:
                return ch
            mask |= bit
        return ''
