class Solution:
    def countMaxOrSubsets(self, nums: list[int]) -> int:
        max_or = 0
        for x in nums:
            max_or |= x

        count = 0
        n = len(nums)

        def dfs(idx: int, curr_or: int) -> None:
            nonlocal count
            if idx == n:
                if curr_or == max_or:
                    count += 1
                return
            dfs(idx + 1, curr_or | nums[idx])
            dfs(idx + 1, curr_or)

        dfs(0, 0)
        return count
