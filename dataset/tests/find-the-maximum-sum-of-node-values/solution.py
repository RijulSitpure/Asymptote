class Solution:
    def maximumValueSum(self, nums: list[int], k: int, edges: list[list[int]]) -> int:
        total = sum(nums)
        diffs = [(x ^ k) - x for x in nums]
        diffs.sort(reverse=True)
        for i in range(0, len(diffs) - 1, 2):
            gain = diffs[i] + diffs[i + 1]
            if gain > 0:
                total += gain
            else:
                break
        return total
