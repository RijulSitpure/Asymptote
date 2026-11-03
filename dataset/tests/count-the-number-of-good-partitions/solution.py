class Solution:
    def numberOfGoodPartitions(self, nums: list[int]) -> int:
        last = {num: i for i, num in enumerate(nums)}
        MOD = 1_000_000_007
        components = 0
        max_reach = 0
        for i, num in enumerate(nums):
            max_reach = max(max_reach, last[num])
            if i == max_reach:
                components += 1
        return pow(2, components - 1, MOD)
