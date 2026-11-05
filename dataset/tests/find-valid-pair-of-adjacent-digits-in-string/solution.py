class Solution:
    def findValidPair(self, s: str) -> str:
        counts = {str(d): s.count(str(d)) for d in range(10)}
        for i in range(len(s) - 1):
            d1, d2 = s[i], s[i + 1]
            if d1 != d2 and counts[d1] == int(d1) and counts[d2] == int(d2):
                return d1 + d2
        return ""
