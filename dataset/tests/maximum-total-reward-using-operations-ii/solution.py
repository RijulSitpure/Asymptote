class Solution:
    def maxTotalReward(self, rewardValues: list[int]) -> int:
        rewardValues = sorted(set(rewardValues))
        dp = 1
        for v in rewardValues:
            valid_mask = (1 << v) - 1
            dp |= (dp & valid_mask) << v
        return dp.bit_length() - 1