class Solution:
    def maximumBags(self, capacity: list[int], rocks: list[int], additionalRocks: int) -> int:
        diff = sorted(c - r for c, r in zip(capacity, rocks))
        ans = 0
        for d in diff:
            if additionalRocks >= d:
                additionalRocks -= d
                ans += 1
            else:
                break
        return ans
