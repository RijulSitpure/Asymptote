from collections import Counter

class Solution:
    def countBadPairs(self, nums: list[int]) -> int:
        n = len(nums)
        total_pairs = n * (n - 1) // 2
        counts = Counter(x - i for i, x in enumerate(nums))
        good_pairs = sum(c * (c - 1) // 2 for c in counts.values())
        return total_pairs - good_pairs
