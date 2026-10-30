class Solution:
    def minOperations(self, grid: list[list[int]], x: int) -> int:
        vals = [val for row in grid for val in row]
        rem = vals[0] % x
        if any(v % x != rem for v in vals):
            return -1
        vals.sort()
        median = vals[len(vals) // 2]
        return sum(abs(v - median) // x for v in vals)
