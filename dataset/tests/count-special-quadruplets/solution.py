from collections import Counter

class Solution:
    def countQuadruplets(self, nums: list[int]) -> int:
        n = len(nums)
        diff_count = Counter()
        ans = 0
        for b in range(n - 2, 0, -1):
            c = b + 1
            for d in range(c + 1, n):
                diff_count[nums[d] - nums[c]] += 1
            for a in range(b):
                ans += diff_count[nums[a] + nums[b]]
        return ans
