from collections import Counter
from typing import List

class Solution:
    def largestOverlap(self, img1: List[List[int]], img2: List[List[int]]) -> int:
        n = len(img1)
        pts1 = [(r, c) for r in range(n) for c in range(n) if img1[r][c] == 1]
        pts2 = [(r, c) for r in range(n) for c in range(n) if img2[r][c] == 1]
        if not pts1 or not pts2:
            return 0
        diffs = Counter((r1 - r2, c1 - c2) for r1, c1 in pts1 for r2, c2 in pts2)
        return max(diffs.values())

def test():
    sol = Solution()
    i1 = [[1, 1, 0], [0, 1, 0], [0, 1, 0]]
    i2 = [[0, 0, 0], [0, 1, 1], [0, 0, 1]]
    assert sol.largestOverlap(i1, i2) == 3, "test 1 failed"
    print("✓ image-overlap passed")

if __name__ == "__main__":
    test()
