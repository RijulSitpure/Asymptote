class Solution:
    def getSmallestString(self, s: str) -> str:
        chars = list(s)
        for i in range(len(chars) - 1):
            d1, d2 = int(chars[i]), int(chars[i + 1])
            if d1 % 2 == d2 % 2 and d1 > d2:
                chars[i], chars[i + 1] = chars[i + 1], chars[i]
                break
        return "".join(chars)