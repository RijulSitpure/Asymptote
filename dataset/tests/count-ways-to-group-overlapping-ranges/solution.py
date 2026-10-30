class Solution:
    def countWays(self, ranges: list[list[int]]) -> int:
        ranges.sort()
        MOD = 10**9 + 7
        components = 0
        max_end = -1
        for start, end in ranges:
            if start > max_end:
                components += 1
            max_end = max(max_end, end)
        return pow(2, components, MOD)
