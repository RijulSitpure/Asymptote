from collections import Counter

def countGood(nums: list[int], k: int) -> int:
    count = Counter()
    ans = 0
    left = 0
    cur_pairs = 0
    for right, x in enumerate(nums):
        cur_pairs += count[x]
        count[x] += 1
        while cur_pairs >= k:
            ans += len(nums) - right
            count[nums[left]] -= 1
            cur_pairs -= count[nums[left]]
            left += 1
    return ans