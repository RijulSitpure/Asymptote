def minOperationsToZeroXOR(nums: list[int]) -> int:
    xor_sum = 0
    for x in nums:
        xor_sum ^= x
    return 0 if xor_sum == 0 else 1