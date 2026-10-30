class Solution:
    def beautifulSubsets(self, nums: list[int], k: int) -> int:
        from collections import defaultdict
        nums.sort()
        count = defaultdict(int)
        ans = 0
        def backtrack(i):
            nonlocal ans
            if i == len(nums):
                ans += 1
                return
            backtrack(i + 1)
            if count[nums[i] - k] == 0:
                count[nums[i]] += 1
                backtrack(i + 1)
                count[nums[i]] -= 1
        backtrack(0)
        return ans - 1
