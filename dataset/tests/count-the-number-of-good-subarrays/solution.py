from collections import Counter

class Solution:
    def countGood(self, nums: list[int], k: int) -> int:
        counts = Counter()
        pairs = 0
        left = 0
        ans = 0
        n = len(nums)
        for right, x in enumerate(nums):
            pairs += counts[x]
            counts[x] += 1
            while pairs >= k:
                ans += n - right
                counts[nums[left]] -= 1
                pairs -= counts[nums[left]]
                left += 1
        return ans
