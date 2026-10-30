class Solution:
    def colorTheArray(self, n: int, queries: list[list[int]]) -> list[int]:
        nums = [0] * n
        same_adj = 0
        ans = []
        for idx, color in queries:
            if nums[idx] != 0:
                if idx > 0 and nums[idx] == nums[idx - 1]:
                    same_adj -= 1
                if idx < n - 1 and nums[idx] == nums[idx + 1]:
                    same_adj -= 1
            nums[idx] = color
            if nums[idx] != 0:
                if idx > 0 and nums[idx] == nums[idx - 1]:
                    same_adj += 1
                if idx < n - 1 and nums[idx] == nums[idx + 1]:
                    same_adj += 1
            ans.append(same_adj)
        return ans
