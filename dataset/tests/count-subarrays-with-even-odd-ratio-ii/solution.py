from collections import defaultdict

def countSubarraysWithEvenOddDiff(nums: list[int], diff: int) -> int:
    counts = defaultdict(int)
    counts[0] = 1
    cur = 0
    ans = 0
    for x in nums:
        cur += 1 if x % 2 == 0 else -1
        ans += counts[cur - diff]
        counts[cur] += 1
    return ans