from collections import Counter

class Solution:
    def closeStrings(self, word1: str, word2: str) -> bool:
        if len(word1) != len(word2):
            return False
        c1 = Counter(word1)
        c2 = Counter(word2)
        return set(c1.keys()) == set(c2.keys()) and sorted(c1.values()) == sorted(c2.values())

def test():
    sol = Solution()
    assert sol.closeStrings("abc", "bca") == True
    assert sol.closeStrings("a", "aa") == False
    assert sol.closeStrings("cabbba", "abbccc") == True

    print("✓ determine-if-two-strings-are-close passed")

if __name__ == '__main__':
    test()
