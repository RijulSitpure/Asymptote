class Solution:
    def maxFrequencyElements(self, nums: list[int]) -> int:
        from collections import Counter
        counts = Counter(nums)
        max_f = max(counts.values())
        return sum(v for v in counts.values() if v == max_f)
