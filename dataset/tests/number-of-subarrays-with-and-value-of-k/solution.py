from collections import Counter

class Solution:
    def countSubarrays(self, nums: list[int], k: int) -> int:
        ans = 0
        prev = Counter()
        for x in nums:
            cur = Counter()
            cur[x] += 1
            for val, cnt in prev.items():
                cur[val & x] += cnt
            ans += cur[k]
            prev = cur
        return ans