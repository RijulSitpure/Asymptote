class Solution:
    def makeSimilar(self, nums: list[int], target: list[int]) -> int:
        nums_even = sorted([x for x in nums if x % 2 == 0])
        nums_odd = sorted([x for x in nums if x % 2 != 0])
        tgt_even = sorted([x for x in target if x % 2 == 0])
        tgt_odd = sorted([x for x in target if x % 2 != 0])
        diff = sum(abs(a - b) for a, b in zip(nums_even, tgt_even)) + sum(abs(a - b) for a, b in zip(nums_odd, tgt_odd))
        return diff // 4
