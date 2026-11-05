from collections import Counter

def smallestPair(nums: list[int]) -> list[int]:
    freq = Counter(nums)
    uniques = sorted(freq.keys())
    for i in range(len(uniques)):
        for j in range(i + 1, len(uniques)):
            if freq[uniques[i]] != freq[uniques[j]]:
                return [uniques[i], uniques[j]]
    return [-1, -1]