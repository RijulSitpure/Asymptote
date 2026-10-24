class Solution:
    def lastSubstring(self, s: str) -> str:
        i, j, k = 0, 1, 0
        n = len(s)
        while j + k < n:
            if s[i + k] == s[j + k]:
                k += 1
            elif s[i + k] < s[j + k]:
                i = max(i + k + 1, j)
                j = i + 1
                k = 0
            else:
                j = j + k + 1
                k = 0
        return s[i:]

def test():
    sol = Solution()
    assert sol.lastSubstring("abab") == "bab", "test 1 failed"
    assert sol.lastSubstring("leetcode") == "tcode", "test 2 failed"
    print("✓ last-substring-in-lexicographical-order passed")

if __name__ == "__main__":
    test()
