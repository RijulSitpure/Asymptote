class Solution:
    def arrangeWords(self, text: str) -> str:
        words = text.split()
        words[0] = words[0].lower()
        words.sort(key=len)
        words[0] = words[0].capitalize()
        return " ".join(words)

def test():
    sol = Solution()
    assert sol.arrangeWords("Leetcode is cool") == "Is cool leetcode", "test 1 failed"
    assert sol.arrangeWords("Keep calm and code on") == "On and keep calm code", "test 2 failed"
    assert sol.arrangeWords("To be or not to be") == "To be or to be not", "test 3 failed"
    print("✓ rearrange-words-in-a-sentence passed")

if __name__ == "__main__":
    test()
