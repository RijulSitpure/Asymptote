class Solution:
    def distinctSubseqII(self, s: str) -> int:
        MOD = 1_000_000_007
        ends_with = [0] * 26
        for ch in s:
            idx = ord(ch) - ord("a")
            ends_with[idx] = (sum(ends_with) + 1) % MOD
        return sum(ends_with) % MOD

def test():
    sol = Solution()
    assert sol.distinctSubseqII("abc") == 7, "test 1 failed"
    assert sol.distinctSubseqII("aba") == 6, "test 2 failed"
    assert sol.distinctSubseqII("aaa") == 3, "test 3 failed"
    print("✓ distinct-subsequences-ii passed")

if __name__ == "__main__":
    test()
