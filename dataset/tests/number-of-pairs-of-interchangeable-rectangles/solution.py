import math
from collections import defaultdict

class Solution:
    def interchangeableRectangles(self, rectangles: list[list[int]]) -> int:
        freq = defaultdict(int)
        for w, h in rectangles:
            g = math.gcd(w, h)
            freq[(w // g, h // g)] += 1
        ans = 0
        for cnt in freq.values():
            ans += cnt * (cnt - 1) // 2
        return ans
