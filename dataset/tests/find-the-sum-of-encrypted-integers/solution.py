class Solution:
    def sumOfEncryptedInt(self, nums: list[int]) -> int:
        total = 0
        for x in nums:
            s = str(x)
            d = max(s)
            total += int(d * len(s))
        return total
