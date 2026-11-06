from collections import defaultdict

def countEqualEvenOddSubarrays(nums: list[int]) -> int:
    counts = defaultdict(int)
    counts[0] = 1
    cur = 0
    ans = 0
    for x in nums:
        cur += 1 if x % 2 == 0 else -1
        ans += counts[cur]
        counts[cur] += 1
    return ans