class Solution:
    def largestGoodInteger(self, num: str) -> str:
        for d in map(str, range(9, -1, -1)):
            triple = d * 3
            if triple in num:
                return triple
        return ""
