class Solution:
    def arrayStringsAreEqual(self, word1: list[str], word2: list[str]) -> bool:
        return "".join(word1) == "".join(word2)

def test():
    sol = Solution()
    assert sol.arrayStringsAreEqual(["ab", "c"], ["a", "bc"]) == True
    assert sol.arrayStringsAreEqual(["a", "cb"], ["ab", "c"]) == False
    assert sol.arrayStringsAreEqual(["abc", "d", "defg"], ["abcddefg"]) == True

    print("✓ check-if-two-string-arrays-are-equivalent passed")

if __name__ == '__main__':
    test()
