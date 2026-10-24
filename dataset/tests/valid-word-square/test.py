import sys
from typing import List

class Solution:
    def validWordSquare(self, words: List[str]) -> bool:
        for r in range(len(words)):
            for c in range(len(words[r])):
                if c >= len(words) or r >= len(words[c]) or words[r][c] != words[c][r]:
                    return False
        return True

def test():
    sol = Solution()
    assert sol.validWordSquare(["abcd","bnrt","crmy","dtye"]) is True, "test 1 failed"
    assert sol.validWordSquare(["abcd","bnrt","crm","dt"]) is True, "test 2 failed"
    assert sol.validWordSquare(["ball","area","read","lady"]) is False, "test 3 failed"
    print("✓ valid-word-square passed")

if __name__ == "__main__":
    test()
