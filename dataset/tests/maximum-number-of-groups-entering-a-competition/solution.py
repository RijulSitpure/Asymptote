import math

class Solution:
    def maximumGroups(self, grades: list[int]) -> int:
        n = len(grades)
        return int((math.isqrt(1 + 8 * n) - 1) // 2)
