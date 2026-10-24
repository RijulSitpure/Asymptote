import sys

class Solution:
    def wordPattern(self, pattern: str, s: str) -> bool:
        words = s.split()
        if len(pattern) != len(words):
            return False
        p2w = {}
        w2p = {}
        for p_ch, w in zip(pattern, words):
            if (p_ch in p2w and p2w[p_ch] != w) or (w in w2p and w2p[w] != p_ch):
                return False
            p2w[p_ch] = w
            w2p[w] = p_ch
        return True

def test():
    sol = Solution()
    assert sol.wordPattern("abba", "dog cat cat dog") is True, "test 1 failed"
    assert sol.wordPattern("abba", "dog cat cat fish") is False, "test 2 failed"
    assert sol.wordPattern("aaaa", "dog cat cat dog") is False, "test 3 failed"
    print("✓ word-pattern passed")

if __name__ == "__main__":
    test()
