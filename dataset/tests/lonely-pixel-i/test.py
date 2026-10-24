import sys
from typing import List

class Solution:
    def findLonelyPixel(self, picture: List[List[str]]) -> int:
        m, n = len(picture), len(picture[0])
        row_count = [0] * m
        col_count = [0] * n
        for r in range(m):
            for c in range(n):
                if picture[r][c] == "B":
                    row_count[r] += 1
                    col_count[c] += 1
        ans = 0
        for r in range(m):
            for c in range(n):
                if picture[r][c] == "B" and row_count[r] == 1 and col_count[c] == 1:
                    ans += 1
        return ans

def test():
    sol = Solution()
    pic1 = [["W","W","B"],["W","B","W"],["B","W","W"]]
    assert sol.findLonelyPixel(pic1) == 3, "test 1 failed"
    pic2 = [["B","B","B"],["B","B","W"],["B","B","B"]]
    assert sol.findLonelyPixel(pic2) == 0, "test 2 failed"
    print("✓ lonely-pixel-i passed")

if __name__ == "__main__":
    test()
