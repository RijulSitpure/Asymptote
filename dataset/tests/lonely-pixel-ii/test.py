import sys
from typing import List
from collections import Counter

class Solution:
    def findBlackPixel(self, picture: List[List[str]], target: int) -> int:
        m, n = len(picture), len(picture[0])
        col_counts = [0] * n
        row_patterns = []

        for row in picture:
            row_str = "".join(row)
            row_patterns.append(row_str)
            for c in range(n):
                if row[c] == "B":
                    col_counts[c] += 1

        pattern_freq = Counter(row_patterns)
        ans = 0

        for row_str, freq in pattern_freq.items():
            if freq == target and row_str.count("B") == target:
                for c in range(n):
                    if row_str[c] == "B" and col_counts[c] == target:
                        ans += target

        return ans

def test():
    sol = Solution()
    pic1 = [
        ["W","B","W","B","B","W"],
        ["W","B","W","B","B","W"],
        ["W","B","W","B","B","W"],
        ["W","W","B","W","B","W"]
    ]
    assert sol.findBlackPixel(pic1, 3) == 6, "test 1 failed"
    pic2 = [
        ["W","B","W","B","B","W"],
        ["W","B","W","B","B","W"],
        ["W","B","W","B","B","W"],
        ["W","W","E","W","B","W"]
    ]
    assert sol.findBlackPixel(pic2, 3) == 6, "test 2 failed"
    print("✓ lonely-pixel-ii passed")

if __name__ == "__main__":
    test()
