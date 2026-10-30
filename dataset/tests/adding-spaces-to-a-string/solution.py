class Solution:
    def addSpaces(self, s: str, spaces: list[int]) -> str:
        parts = []
        prev = 0
        for idx in spaces:
            parts.append(s[prev:idx])
            prev = idx
        parts.append(s[prev:])
        return " ".join(parts)
