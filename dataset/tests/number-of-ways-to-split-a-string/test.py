class Solution:
    def numWays(self, s: str) -> int:
        MOD = 10**9 + 7
        total = s.count("1")
        n = len(s)
        if total % 3 != 0:
            return 0
        if total == 0:
            return ((n - 1) * (n - 2) // 2) % MOD
        k = total // 3
        ones = 0
        ways1 = 0
        ways2 = 0
        for ch in s:
            if ch == "1":
                ones += 1
            if ones == k:
                ways1 += 1
            elif ones == 2 * k:
                ways2 += 1
        return (ways1 * ways2) % MOD

def test():
    sol = Solution()
    assert sol.numWays("10101") == 4, "test 1 failed"
    assert sol.numWays("1001") == 0, "test 2 failed"
    assert sol.numWays("0000") == 3, "test 3 failed"
    print("✓ number-of-ways-to-split-a-string passed")

if __name__ == "__main__":
    test()
