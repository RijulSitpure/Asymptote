class Solution:
    def elementInNums(self, nums: list[int], queries: list[list[int]]) -> list[int]:
        n = len(nums)
        period = 2 * n
        ans = []

        for time, idx in queries:
            m = time % period
            if m < n:
                rem_len = n - m
                if idx < rem_len:
                    ans.append(nums[m + idx])
                else:
                    ans.append(-1)
            else:
                rem_len = m - n
                if idx < rem_len:
                    ans.append(nums[idx])
                else:
                    ans.append(-1)

        return ans
