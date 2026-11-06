def minTransformOperations(nums: list[int]) -> int:
    # Operations allow incrementing one element while decrementing another
    # Total sum is invariant. To equalize all elements, each must become total // n
    n = len(nums)
    total = sum(nums)
    if total % n != 0:
        return -1

    target = total // n
    pos_diff = sum(x - target for x in nums if x > target)
    return pos_diff