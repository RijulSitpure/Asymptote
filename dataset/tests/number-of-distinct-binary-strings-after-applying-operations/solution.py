class Solution:
    def countDistinctStrings(self, s: str, k: int) -> int:
        MOD = 1_000_000_007
        return pow(2, len(s) - k + 1, MOD)
