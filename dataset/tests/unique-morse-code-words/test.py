from typing import List

class Solution:
    def uniqueMorseRepresentations(self, words: List[str]) -> int:
        morse = [
            ".-", "-...", "-.-.", "-..", ".", "..-.", "--.", "....", "..", ".---",
            "-.-", ".-..", "--", "-.", "---", ".--.", "--.-", ".-.", "...", "-",
            "..-", "...-", ".--", "-..-", "-.--", "--.."
        ]
        seen = set()
        for word in words:
            code = "".join(morse[ord(ch) - ord('a')] for ch in word)
            seen.add(code)
        return len(seen)

def test():
    sol = Solution()
    assert sol.uniqueMorseRepresentations(["gin", "zen", "gig", "msg"]) == 2, "test 1 failed"
    assert sol.uniqueMorseRepresentations(["a"]) == 1, "test 2 failed"
    print("✓ unique-morse-code-words passed")

if __name__ == "__main__":
    test()
