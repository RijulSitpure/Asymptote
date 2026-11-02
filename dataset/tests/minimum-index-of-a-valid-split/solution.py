from collections import Counter

class Solution:
    def minimumIndex(self, nums: list[int]) -> int:
        n = len(nums)
        counts = Counter(nums)
        dominant, total = counts.most_common(1)[0]
        left_count = 0
        for i in range(n - 1):
            if nums[i] == dominant:
                left_count += 1
            right_count = total - left_count
            left_len = i + 1
            right_len = n - left_len
            if left_count * 2 > left_len and right_count * 2 > right_len:
                return i
        return -1