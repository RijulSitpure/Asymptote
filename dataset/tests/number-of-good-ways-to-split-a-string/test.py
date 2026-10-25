class Solution:
    def numSplits(self, s: str) -> int:
        n = len(s)
        pref = [0] * n
        seen = set()
        for i in range(n):
            seen.add(s[i])
            pref[i] = len(seen)
        suff = [0] * n
        seen = set()
        for i in range(n - 1, -1, -1):
            seen.add(s[i])
            suff[i] = len(seen)
        ans = 0
        for i in range(n - 1):
            if pref[i] == suff[i + 1]:
                ans += 1
        return ans

def test():
    sol = Solution()
    assert sol.numSplits("aacaba") == 2, "test 1 failed"
    assert sol.numSplits("abcd") == 1, "test 2 failed"
    print("✓ number-of-good-ways-to-split-a-string passed")

if __name__ == "__main__":
    test()
