class Solution:
    def minimumLevels(self, possible: list[int]) -> int:
        points = [1 if x == 1 else -1 for x in possible]
        total = sum(points)
        prefix = 0
        n = len(possible)
        for i in range(n - 1):
            prefix += points[i]
            if 2 * prefix > total:
                return i + 1
        return -1
