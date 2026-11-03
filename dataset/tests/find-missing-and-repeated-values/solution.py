class Solution:
    def findMissingAndRepeatedValues(self, grid: list[list[int]]) -> list[int]:
        n = len(grid)
        total = n * n
        counts = [0] * (total + 1)
        for row in grid:
            for val in row:
                counts[val] += 1
        repeated = -1
        missing = -1
        for x in range(1, total + 1):
            if counts[x] == 2:
                repeated = x
            elif counts[x] == 0:
                missing = x
        return [repeated, missing]
