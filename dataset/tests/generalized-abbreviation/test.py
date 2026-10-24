import sys
from typing import List

class Solution:
    def generateAbbreviations(self, word: str) -> List[str]:
        res = []
        def backtrack(pos: int, curr: List[str], count: int):
            if pos == len(word):
                res.append("".join(curr) + (str(count) if count > 0 else ""))
                return
            backtrack(pos + 1, curr, count + 1)
            curr.append((str(count) if count > 0 else "") + word[pos])
            backtrack(pos + 1, curr, 0)
            curr.pop()
        backtrack(0, [], 0)
        return res

def test():
    sol = Solution()
    res = sorted(sol.generateAbbreviations("word"))
    assert "4" in res, "test 1 failed"
    assert "word" in res, "test 2 failed"
    assert "1o1d" in res, "test 3 failed"
    assert len(res) == 16, "test 4 failed"
    print("✓ generalized-abbreviation passed")

if __name__ == "__main__":
    test()
