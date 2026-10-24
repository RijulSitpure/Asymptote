class Solution:
    def numDecodings(self, s: str) -> int:
        mod = 10**9 + 7
        dp0, dp1 = 1, 0
        if s[0] == "*":
            dp1 = 9
        elif s[0] != "0":
            dp1 = 1

        for i in range(1, len(s)):
            dp2 = 0
            c1, c2 = s[i - 1], s[i]
            if c2 == "*":
                dp2 = (dp2 + 9 * dp1) % mod
            elif c2 != "0":
                dp2 = (dp2 + dp1) % mod

            if c1 == "*":
                if c2 == "*":
                    dp2 = (dp2 + 15 * dp0) % mod
                elif "0" <= c2 <= "6":
                    dp2 = (dp2 + 2 * dp0) % mod
                else:
                    dp2 = (dp2 + dp0) % mod
            elif c1 == "1":
                if c2 == "*":
                    dp2 = (dp2 + 9 * dp0) % mod
                else:
                    dp2 = (dp2 + dp0) % mod
            elif c1 == "2":
                if c2 == "*":
                    dp2 = (dp2 + 6 * dp0) % mod
                elif "0" <= c2 <= "6":
                    dp2 = (dp2 + dp0) % mod

            dp0, dp1 = dp1, dp2

        return dp1

def test():
    sol = Solution()
    assert sol.numDecodings("*") == 9, "test 1 failed"
    assert sol.numDecodings("1*") == 18, "test 2 failed"
    assert sol.numDecodings("2*") == 15, "test 3 failed"
    print("✓ decode-ways-ii passed")

if __name__ == "__main__":
    test()
