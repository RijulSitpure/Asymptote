class Solution:
    def numberOfUniqueGoodSubsequences(self, binary: str) -> int:
        MOD = 10**9 + 7
        ends0 = 0
        ends1 = 0
        has_zero = 0
        for ch in binary:
            if ch == "1":
                ends1 = (ends0 + ends1 + 1) % MOD
            else:
                ends0 = (ends0 + ends1) % MOD
                has_zero = 1
        return (ends0 + ends1 + has_zero) % MOD
