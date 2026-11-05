def minOperations(nums: list[int]) -> int:
    cost0 = 0
    cost1 = 0
    for i, x in enumerate(nums):
        if x % 2 != i % 2:
            cost0 += 1
        if x % 2 != (i + 1) % 2:
            cost1 += 1
    return min(cost0, cost1)