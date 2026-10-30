from collections import Counter

class Solution:
    def numberOfPairs(self, nums: list[int]) -> list[int]:
        counts = Counter(nums)
        pairs = sum(c // 2 for c in counts.values())
        leftover = sum(c % 2 for c in counts.values())
        return [pairs, leftover]
