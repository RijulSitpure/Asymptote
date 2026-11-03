from collections import Counter

class Solution:
    def isPossibleToSplit(self, nums: list[int]) -> bool:
        cnt = Counter(nums)
        return all(c <= 2 for c in cnt.values())
