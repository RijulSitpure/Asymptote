class Solution:
    def canBeTypedWords(self, text: str, brokenLetters: str) -> int:
        broken = set(brokenLetters)
        words = text.split()
        ans = 0
        for w in words:
            if not any(ch in broken for ch in w):
                ans += 1
        return ans

def test_can_be_typed_words():
    sol = Solution()
    assert sol.canBeTypedWords("hello world", "ad") == 1
    assert sol.canBeTypedWords("leet code", "lt") == 1
    assert sol.canBeTypedWords("leet code", "e") == 0

