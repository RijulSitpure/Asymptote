class Solution:
    def countMatchingSubarrays(self, nums: list[int], pattern: list[int]) -> int:
        def sgn(x):
            return 1 if x > 0 else (-1 if x < 0 else 0)
        diff = [sgn(nums[i + 1] - nums[i]) for i in range(len(nums) - 1)]
        m = len(pattern)
        pi = [0] * m
        j = 0
        for i in range(1, m):
            while j > 0 and pattern[i] != pattern[j]:
                j = pi[j - 1]
            if pattern[i] == pattern[j]:
                j += 1
            pi[i] = j
        ans = 0
        j = 0
        for x in diff:
            while j > 0 and x != pattern[j]:
                j = pi[j - 1]
            if x == pattern[j]:
                j += 1
            if j == m:
                ans += 1
                j = pi[j - 1]
        return ans
