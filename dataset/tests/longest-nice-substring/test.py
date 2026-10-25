class Solution:
    def longestNiceSubstring(self, s: str) -> str:
        if len(s) < 2:
            return ""
        chars = set(s)
        for i, c in enumerate(s):
            if c.swapcase() not in chars:
                s1 = self.longestNiceSubstring(s[:i])
                s2 = self.longestNiceSubstring(s[i + 1:])
                return s1 if len(s1) >= len(s2) else s2
        return s

def test():
    sol = Solution()
    assert sol.longestNiceSubstring("YazaAay") == "aAa"
    assert sol.longestNiceSubstring("Bb") == "Bb"
    assert sol.longestNiceSubstring("c") == ""

    print("✓ longest-nice-substring passed")

if __name__ == '__main__':
    test()
