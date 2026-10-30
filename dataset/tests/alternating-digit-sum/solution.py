class Solution:
    def alternateDigitSum(self, n: int) -> int:
        s = str(n)
        return sum(int(ch) if i % 2 == 0 else -int(ch) for i, ch in enumerate(s))
