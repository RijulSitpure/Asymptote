class Solution:
    def countHomogenous(self, s: str) -> int:
        MOD = 10**9 + 7
        ans = 0
        streak = 0
        prev = ''
        for c in s:
            if c == prev:
                streak += 1
            else:
                streak = 1
                prev = c
            ans = (ans + streak) % MOD
        return ans

def test():
    sol = Solution()
    assert sol.countHomogenous("abbcccaa") == 13
    assert sol.countHomogenous("xy") == 2
    assert sol.countHomogenous("zzzzz") == 15

    print("✓ count-number-of-homogenous-substrings passed")

if __name__ == '__main__':
    test()
