from typing import List
import collections

class Solution:
    def countCornerRectangles(self, grid: List[List[int]]) -> int:
        count = collections.defaultdict(int)
        ans = 0
        for row in grid:
            cols = [c for c, val in enumerate(row) if val == 1]
            for i in range(len(cols)):
                for j in range(i + 1, len(cols)):
                    pair = (cols[i], cols[j])
                    ans += count[pair]
                    count[pair] += 1
        return ans

def test():
    sol = Solution()
    g1 = [
        [1, 0, 0, 1, 0],
        [0, 0, 1, 0, 1],
        [0, 0, 0, 1, 0],
        [1, 0, 1, 0, 1]
    ]
    assert sol.countCornerRectangles(g1) == 1, "test 1 failed"
    g2 = [
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1]
    ]
    assert sol.countCornerRectangles(g2) == 9, "test 2 failed"
    print("✓ number-of-corner-rectangles passed")

if __name__ == "__main__":
    test()
