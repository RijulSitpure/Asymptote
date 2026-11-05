from collections import defaultdict

def countValidSubarraysWithMatchingDigits(nums: list[int], d: int) -> int:
    rem_counts = defaultdict(int)
    rem_counts[0] = 1
    cur_sum = 0
    ans = 0
    for x in nums:
        cur_sum = (cur_sum + x) % d
        ans += rem_counts[cur_sum]
        rem_counts[cur_sum] += 1
    return ans