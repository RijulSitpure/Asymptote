def minOperationsToUniform(nums: list[int]) -> int:
    odds = sum(1 for x in nums if x % 2 != 0)
    evens = len(nums) - odds
    return min(odds, evens)