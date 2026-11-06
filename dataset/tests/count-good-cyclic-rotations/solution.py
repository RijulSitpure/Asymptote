def countGoodCyclicRotations(nums: list[int]) -> int:
    n = len(nums)
    if n <= 1:
        return 1

    # Rotation is good if adjacent inversions nums[i] > nums[i+1] is at most 1
    extended = nums + nums
    drops = [1 if extended[i] > extended[i + 1] else 0 for i in range(2 * n - 1)]

    curr_drops = sum(drops[:n - 1])
    good = 1 if curr_drops <= 1 else 0

    for i in range(1, n):
        curr_drops += drops[i + n - 2] - drops[i - 1]
        if curr_drops <= 1:
            good += 1
    return good