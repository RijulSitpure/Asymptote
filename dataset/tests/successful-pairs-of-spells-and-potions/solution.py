import bisect

class Solution:
    def successfulPairs(self, spells: list[int], potions: list[int], success: int) -> list[int]:
        potions.sort()
        m = len(potions)
        ans = []
        for s in spells:
            min_p = (success + s - 1) // s
            idx = bisect.bisect_left(potions, min_p)
            ans.append(m - idx)
        return ans
