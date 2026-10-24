import sys
from typing import List

class Solution:
    def fullJustify(self, words: List[str], maxWidth: int) -> List[str]:
        res = []
        line = []
        length = 0

        for word in words:
            if length + len(line) + len(word) > maxWidth:
                for i in range(maxWidth - length):
                    line[i % (len(line) - 1 or 1)] += " "
                res.append("".join(line))
                line, length = [], 0
            line.append(word)
            length += len(word)

        res.append(" ".join(line).ljust(maxWidth))
        return res

def test():
    sol = Solution()
    words1 = ["This", "is", "an", "example", "of", "text", "justification."]
    r1 = sol.fullJustify(words1, 16)
    expected1 = [
        "This    is    an",
        "example  of text",
        "justification.  "
    ]
    assert r1 == expected1, "test 1 failed"
    print("✓ text-justification passed")

if __name__ == "__main__":
    test()
