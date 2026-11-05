from collections import Counter

def firstUniqueEven(nums: list[int]) -> int:
    counts = Counter(x for x in nums if x % 2 == 0)
    for x in nums:
        if x % 2 == 0 and counts[x] == 1:
            return x
    return -1