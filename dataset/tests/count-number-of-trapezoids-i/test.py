from typing import List
from collections import Counter

class Solution:
    def countTrapezoids(self, points: List[List[int]]) -> int:
        # Group points by y coordinate
        y_counts = Counter(y for x, y in points)
        # For each y, number of horizontal segments is c*(c-1)//2
        seg_counts = [c * (c - 1) // 2 for c in y_counts.values() if c >= 2]
        
        # A trapezoid is formed by choosing 1 segment from y1 and 1 segment from y2 (y1 != y2)
        # Sum of seg[i] * seg[j] for i < j
        total = 0
        running_sum = 0
        for cnt in seg_counts:
            total += running_sum * cnt
            running_sum += cnt
            
        return total

def run_tests():
    s = Solution()
    # 2 points on y=0 (1 pair), 2 points on y=1 (1 pair) -> 1 * 1 = 1 trapezoid
    res1 = s.countTrapezoids([[0, 0], [1, 0], [0, 1], [1, 1]])
    assert res1 == 1, f"Expected 1, got {res1}"
    res2 = s.countTrapezoids([[0, 0], [1, 0], [2, 0]]) # only 1 horizontal line
    assert res2 == 0, f"Expected 0, got {res2}"
    print("3623 count-number-of-trapezoids-i PASSED")

if __name__ == "__main__":
    run_tests()
