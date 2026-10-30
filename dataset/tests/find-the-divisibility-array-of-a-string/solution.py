class Solution:
    def divisibilityArray(self, word: str, m: int) -> list[int]:
        res = []
        rem = 0
        for ch in word:
            rem = (rem * 10 + int(ch)) % m
            res.append(1 if rem == 0 else 0)
        return res
