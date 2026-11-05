from typing import List
from collections import defaultdict
import math

class Solution:
    def countTrapezoids(self, segments: List[List[int]]) -> int:
        # segments[i] = [x1, y1, x2, y2]
        # Group segments by canonical slope (dy, dx)
        slope_groups = defaultdict(list)
        
        for x1, y1, x2, y2 in segments:
            dx = x2 - x1
            dy = y2 - y1
            g = math.gcd(dx, dy)
            dx //= g
            dy //= g
            if dx < 0 or (dx == 0 and dy < 0):
                dx = -dx
                dy = -dy
            # Intercept representation: cross product / constant c = dy * x1 - dx * y1
            c = dy * x1 - dx * y1
            slope_groups[(dy, dx)].append(c)

        total = 0
        for slope, intercepts in slope_groups.items():
            # Segments with different intercepts can form parallel bases
            intercept_counts = defaultdict(int)
            for c in intercepts:
                intercept_counts[c] += 1
                
            running_sum = 0
            for count in intercept_counts.values():
                total += running_sum * count
                running_sum += count
                
        return total

def run_tests():
    s = Solution()
    # 2 parallel horizontal segments: [0,0,1,0] and [0,1,1,1] -> 1 pair
    res1 = s.countTrapezoids([[0, 0, 1, 0], [0, 1, 1, 1]])
    assert res1 == 1, f"Expected 1, got {res1}"
    res2 = s.countTrapezoids([[0, 0, 1, 1], [1, 0, 2, 1]]) # 2 parallel diagonal segments
    assert res2 == 1, f"Expected 1, got {res2}"
    print("3625 count-number-of-trapezoids-ii PASSED")

if __name__ == "__main__":
    run_tests()
