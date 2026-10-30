class Solution:
    def targetIndices(self, nums: list[int], target: int) -> list[int]:
        less_count = 0
        target_count = 0

        for x in nums:
            if x < target:
                less_count += 1
            elif x == target:
                target_count += 1

        return list(range(less_count, less_count + target_count))
