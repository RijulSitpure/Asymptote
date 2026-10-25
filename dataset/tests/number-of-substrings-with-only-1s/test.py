class Solution:
    def numSub(self, s: str) -> int:
        MOD = 10**9 + 7
        ans = 0
        cur = 0
        for ch in s:
            if ch == "1":
                cur += 1
                ans = (ans + cur) % MOD
            else:
                cur = 0
        return ans

def test():
    sol = Solution()
    assert sol.numSub("0110111") == 9, "test 1 failed"
    assert sol.numSub("101") == 2, "test 2 failed"
    assert sol.numSub("111111") == 21, "test 3 failed"
    print("✓ number-of-substrings-with-only-1s passed")

if __name__ == "__main__":
    test()
