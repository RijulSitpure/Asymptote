class Solution:
    def maxOperations(self, nums: list[int]) -> int:
        n = len(nums)
        candidates = {
            nums[0] + nums[1],
            nums[-2] + nums[-1],
            nums[0] + nums[-1]
        }
        
        def solve(target):
            memo = {}
            def dp(i, j):
                if j - i + 1 < 2:
                    return 0
                state = (i, j)
                if state in memo:
                    return memo[state]
                res = 0
                if nums[i] + nums[i + 1] == target:
                    res = max(res, 1 + dp(i + 2, j))
                if nums[j - 1] + nums[j] == target:
                    res = max(res, 1 + dp(i, j - 2))
                if nums[i] + nums[j] == target:
                    res = max(res, 1 + dp(i + 1, j - 1))
                memo[state] = res
                return res
            return dp(0, n - 1)
            
        return max(solve(target) for target in candidates)
