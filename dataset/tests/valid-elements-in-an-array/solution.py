def findValidElements(nums: list[int]) -> list[int]:
    n = len(nums)
    if n <= 2:
        return nums[:]
    right = [0] * n
    curr_max = -float('inf')
    for i in range(n - 1, -1, -1):
        curr_max = max(curr_max, nums[i])
        right[i] = curr_max
    ans = []
    left_max = -float('inf')
    for i in range(n):
        is_left = (i == 0 or nums[i] > left_max)
        is_right = (i == n - 1 or nums[i] > right[i + 1])
        if is_left or is_right:
            ans.append(nums[i])
        left_max = max(left_max, nums[i])
    return ans