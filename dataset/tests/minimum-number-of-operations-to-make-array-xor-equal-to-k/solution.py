class Solution:
    def minOperations(self, nums: list[int], k: int) -> int:
        xor_all = 0
        for x in nums:
            xor_all ^= x
        return bin(xor_all ^ k).count('1')
