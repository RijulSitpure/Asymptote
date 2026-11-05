class Solution:
    def minimumOperations(self, nums: list[int], target: list[int]) -> int:
        n = len(nums)
        diff = [target[i] - nums[i] for i in range(n)]
        ops = abs(diff[0])
        for i in range(1, n):
            if (diff[i] >= 0 and diff[i - 1] >= 0) or (diff[i] <= 0 and diff[i - 1] <= 0):
                if abs(diff[i]) > abs(diff[i - 1]):
                    ops += abs(diff[i]) - abs(diff[i - 1])
            else:
                ops += abs(diff[i])
        return ops
