class Solution:
    def isPrefixOfWord(self, sentence: str, searchWord: str) -> int:
        for i, word in enumerate(sentence.split(), 1):
            if word.startswith(searchWord):
                return i
        return -1

def test():
    sol = Solution()
    assert sol.isPrefixOfWord("i love eating burger", "burg") == 4, "test 1 failed"
    assert sol.isPrefixOfWord("this problem is an easy problem", "pro") == 2, "test 2 failed"
    assert sol.isPrefixOfWord("i am tired", "you") == -1, "test 3 failed"
    print("✓ check-if-a-word-occurs-as-a-prefix-of-any-word-in-a-sentence passed")

if __name__ == "__main__":
    test()
