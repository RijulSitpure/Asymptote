import sys
from typing import List

class Solution:
    def generatePossibleNextMoves(self, currentState: str) -> List[str]:
        res = []
        for i in range(len(currentState) - 1):
            if currentState[i:i + 2] == "++":
                res.append(currentState[:i] + "--" + currentState[i + 2:])
        return res

def test():
    sol = Solution()
    assert sol.generatePossibleNextMoves("++++") == ["--++", "+--+", "++--"], "test 1 failed"
    assert sol.generatePossibleNextMoves("+") == [], "test 2 failed"
    print("✓ flip-game passed")

if __name__ == "__main__":
    test()
