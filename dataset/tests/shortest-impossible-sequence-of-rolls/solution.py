class Solution:
    def getShortestSequence(self, rolls: list[int], k: int) -> int:
        ans = 1
        seen = set()
        for x in rolls:
            seen.add(x)
            if len(seen) == k:
                ans += 1
                seen.clear()
        return ans
