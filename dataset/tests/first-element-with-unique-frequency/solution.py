from collections import Counter

def firstUniqueFrequency(nums: list[int]) -> int:
    freq = Counter(nums)
    freq_count = Counter(freq.values())
    for x in nums:
        if freq_count[freq[x]] == 1:
            return x
    return -1