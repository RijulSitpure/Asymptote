class Solution:
    def findGoodStrings(self, n: int, s1: str, s2: str, evil: str) -> int:
        MOD = 10**9 + 7
        m = len(evil)
        kmp = [0] * m
        j = 0
        for i in range(1, m):
            while j > 0 and evil[i] != evil[j]:
                j = kmp[j - 1]
            if evil[i] == evil[j]:
                j += 1
            kmp[i] = j

        def get_next(match, ch):
            while match > 0 and evil[match] != ch:
                match = kmp[match - 1]
            if evil[match] == ch:
                match += 1
            return match

        memo = {}

        def dp(i, match, is_lo, is_hi):
            if match == m:
                return 0
            if i == n:
                return 1
            state = (i, match, is_lo, is_hi)
            if state in memo:
                return memo[state]

            c_min = s1[i] if is_lo else "a"
            c_max = s2[i] if is_hi else "z"
            ans = 0
            for c in range(ord(c_min), ord(c_max) + 1):
                ch = chr(c)
                nxt_match = get_next(match, ch)
                nxt_lo = is_lo and (ch == c_min)
                nxt_hi = is_hi and (ch == c_max)
                ans = (ans + dp(i + 1, nxt_match, nxt_lo, nxt_hi)) % MOD

            memo[state] = ans
            return ans

        return dp(0, 0, True, True)

sol = Solution()
assert sol.findGoodStrings(2, "aa", "da", "b") == 51
assert sol.findGoodStrings(8, "leetcode", "leetgoes", "leet") == 0
assert sol.findGoodStrings(2, "gx", "gz", "x") == 2
print("All tests passed successfully.")
