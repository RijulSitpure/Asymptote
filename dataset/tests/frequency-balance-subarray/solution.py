from collections import Counter

def countFrequencyBalancedSubarrays(nums: list[int], k: int) -> int:
    n = len(nums)
    ans = 0
    for i in range(n):
        counts = Counter()
        for j in range(i, n):
            counts[nums[j]] += 1
            if len(counts) == k:
                vals = set(counts.values())
                if len(vals) == 1:
                    ans += 1
            elif len(counts) > k:
                break
    return ans