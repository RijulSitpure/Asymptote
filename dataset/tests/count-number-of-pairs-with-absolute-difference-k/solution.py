from collections import Counter

class Solution:
    def countKDifference(self, nums: list[int], k: int) -> int:
        freq = Counter()
        ans = 0
        for x in nums:
            ans += freq[x - k] + freq[x + k]
            freq[x] += 1
        return ans
