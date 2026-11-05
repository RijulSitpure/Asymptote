class Solution:
    def isSubstringPresent(self, s: str) -> bool:
        pairs = {s[i:i+2] for i in range(len(s) - 1)}
        return any(s[i:i+2][::-1] in pairs for i in range(len(s) - 1))
