from collections import Counter

def delayedCount(nums: list[int], k: int) -> list[int]:
    n = len(nums)
    res = [0] * n
    freq = Counter()
    for i in range(n):
        if i >= k:
            freq[nums[i - k]] += 1
        res[i] = freq[nums[i]]
    return res