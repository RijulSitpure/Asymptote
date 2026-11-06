def maxAlternatingSumWithDeletion(nums: list[int]) -> int:
    n = len(nums)
    if n <= 1:
        return nums[0] if n == 1 else 0

    L_pos = [0] * n
    L_neg = [0] * n
    L_pos[0] = nums[0]
    L_neg[0] = float('-inf')

    for i in range(1, n):
        L_pos[i] = max(nums[i], L_neg[i - 1] + nums[i])
        L_neg[i] = L_pos[i - 1] - nums[i]

    R_pos = [0] * n
    R_neg = [0] * n
    R_pos[-1] = nums[-1]
    R_neg[-1] = -nums[-1]

    for i in range(n - 2, -1, -1):
        R_pos[i] = max(nums[i], nums[i] + R_neg[i + 1])
        R_neg[i] = max(-nums[i], -nums[i] + R_pos[i + 1])

    ans = max(max(L_pos), max(L_neg))

    for i in range(1, n - 1):
        if L_pos[i - 1] != float('-inf'):
            ans = max(ans, L_pos[i - 1] + R_neg[i + 1])
        if L_neg[i - 1] != float('-inf'):
            ans = max(ans, L_neg[i - 1] + R_pos[i + 1])

    ans = max(ans, max(R_pos[1:]), max(L_pos[:-1]))
    return ans