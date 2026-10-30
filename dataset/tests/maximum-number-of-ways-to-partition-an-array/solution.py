from collections import Counter

class Solution:
    def waysToPartition(self, nums: list[int], k: int) -> int:
        n = len(nums)
        total = sum(nums)
        pref = [0] * n
        pref[0] = nums[0]
        for i in range(1, n):
            pref[i] = pref[i - 1] + nums[i]
        diffs = [2 * pref[i] - total for i in range(n - 1)]
        right_count = Counter(diffs)
        left_count = Counter()
        ans = right_count[0]
        for i in range(n):
            d = k - nums[i]
            curr = left_count[d] + right_count[-d]
            ans = max(ans, curr)
            if i < n - 1:
                diff = diffs[i]
                right_count[diff] -= 1
                left_count[diff] += 1
        return ans
