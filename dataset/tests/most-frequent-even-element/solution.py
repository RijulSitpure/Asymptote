from collections import Counter

class Solution:
    def mostFrequentEven(self, nums: list[int]) -> int:
        counts = Counter(x for x in nums if x % 2 == 0)
        if not counts:
            return -1
        best_val = -1
        best_freq = 0
        for val, freq in counts.items():
            if freq > best_freq or (freq == best_freq and (best_val == -1 or val < best_val)):
                best_freq = freq
                best_val = val
        return best_val
