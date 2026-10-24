import sys
from typing import List

class Solution:
    def wordsTyping(self, sentence: List[str], rows: int, cols: int) -> int:
        s = " ".join(sentence) + " "
        n = len(s)
        start = 0
        for _ in range(rows):
            start += cols
            if s[start % n] == " ":
                start += 1
            else:
                while start > 0 and s[(start - 1) % n] != " ":
                    start -= 1
        return start // n

def test():
    sol = Solution()
    assert sol.wordsTyping(["hello", "world"], 2, 8) == 1, "test 1 failed"
    assert sol.wordsTyping(["a", "bcd", "e"], 3, 6) == 2, "test 2 failed"
    assert sol.wordsTyping(["i", "had", "apple", "pie"], 4, 5) == 1, "test 3 failed"
    print("✓ sentence-screen-fitting passed")

if __name__ == "__main__":
    test()
