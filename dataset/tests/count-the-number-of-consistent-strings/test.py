class Solution:
    def countConsistentStrings(self, allowed: str, words: list[str]) -> int:
        allowed_set = set(allowed)
        return sum(all(c in allowed_set for c in w) for w in words)

def test():
    sol = Solution()
    assert sol.countConsistentStrings("ab", ["ad","bd","aaab","baa","badab"]) == 2
    assert sol.countConsistentStrings("abc", ["a","b","c","ab","ac","bc","abc"]) == 7
    assert sol.countConsistentStrings("cad", ["cc","acd","b","ba","bac","bad","d","d"]) == 4

    print("✓ count-the-number-of-consistent-strings passed")

if __name__ == '__main__':
    test()
