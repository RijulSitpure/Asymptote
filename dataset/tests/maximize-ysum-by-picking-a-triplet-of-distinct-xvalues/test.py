from typing import List
from collections import defaultdict

class Solution:
    def maxYSum(self, points: List[List[int]]) -> int:
        best_y = defaultdict(lambda: -float('inf'))
        for x, y in points:
            if y > best_y[x]:
                best_y[x] = y
        if len(best_y) < 3:
            return -1
        vals = sorted(best_y.values(), reverse=True)
        return int(vals[0] + vals[1] + vals[2])

def run_tests():
    s = Solution()
    res1 = s.maxYSum([[1, 2], [1, 5], [2, 3], [3, 4], [2, 1]])
    assert res1 == 12, f"Expected 12, got {res1}" # 5 + 3 + 4 = 12
    res2 = s.maxYSum([[1, 1], [1, 2]])
    assert res2 == -1, f"Expected -1, got {res2}"
    print("3572 maximize-ysum-by-picking-a-triplet-of-distinct-xvalues PASSED")

if __name__ == "__main__":
    run_tests()
