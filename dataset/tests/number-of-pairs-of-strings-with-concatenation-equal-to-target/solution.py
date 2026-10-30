from collections import Counter

class Solution:
    def numOfPairs(self, nums: list[str], target: str) -> int:
        count = Counter(nums)
        ans = 0
        for i in range(1, len(target)):
            p = target[:i]
            s = target[i:]
            if p == s:
                ans += count[p] * (count[p] - 1)
            else:
                ans += count[p] * count[s]
        return ans
