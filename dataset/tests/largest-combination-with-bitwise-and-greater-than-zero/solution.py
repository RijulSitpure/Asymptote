class Solution:
    def largestCombination(self, candidates: list[int]) -> int:
        ans = 0
        for b in range(25):
            cnt = sum(1 for x in candidates if (x >> b) & 1)
            ans = max(ans, cnt)
        return ans
