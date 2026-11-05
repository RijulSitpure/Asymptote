from collections import Counter

def smallestUniqueSubarray(nums: list[int]) -> int:
    n = len(nums)
    low = 1
    high = n
    ans = n
    
    def has_unique(length: int) -> bool:
        counts = Counter()
        for i in range(n - length + 1):
            sub = tuple(nums[i:i + length])
            counts[sub] += 1
        return any(c == 1 for c in counts.values())

    while low <= high:
        mid = (low + high) // 2
        if has_unique(mid):
            ans = mid
            high = mid - 1
        else:
            low = mid + 1
    return ans