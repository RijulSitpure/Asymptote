def minDeletionsToMakeSharp(nums: list[int]) -> int:
    n = len(nums)
    if n <= 1:
        return 0

    # Longest alternating subsequence (wiggle) starting with an increase
    # up: max length ending with an increase
    # down: max length ending with a decrease
    up = 1
    down = 1

    for i in range(1, n):
        if nums[i] > nums[i - 1]:
            up = down + 1
        elif nums[i] < nums[i - 1]:
            down = up + 1

    longest_sharp = max(up, down)
    return n - longest_sharp