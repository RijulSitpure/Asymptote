from collections import Counter

class Solution:
    def isGood(self, nums: list[int]) -> bool:
        n = len(nums)
        if n < 2:
            return False
        base_n = n - 1
        counts = Counter(nums)
        for i in range(1, base_n):
            if counts[i] != 1:
                return False
        return counts[base_n] == 2 and len(counts) == base_n