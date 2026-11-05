class Solution:
    def findPermutationDifference(self, s: str, t: str) -> int:
        pos_s = {c: i for i, c in enumerate(s)}
        return sum(abs(pos_s[c] - i) for i, c in enumerate(t))
