def minCostToMove(nums: list[int], queries: list[list[int]]) -> list[int]:
    n = len(nums)
    pref_fwd = [0] * n
    for i in range(n - 1):
        is_closest = False
        if i == 0:
            is_closest = True
        else:
            diff_left = abs(nums[i] - nums[i - 1])
            diff_right = abs(nums[i] - nums[i + 1])
            if diff_right < diff_left:
                is_closest = True
        cost = 1 if is_closest else abs(nums[i + 1] - nums[i])
        pref_fwd[i + 1] = pref_fwd[i] + cost

    pref_bwd = [0] * n
    for i in range(n - 1, 0, -1):
        is_closest = False
        if i == n - 1:
            is_closest = True
        else:
            diff_left = abs(nums[i] - nums[i - 1])
            diff_right = abs(nums[i] - nums[i + 1])
            if diff_left <= diff_right:
                is_closest = True
        cost = 1 if is_closest else abs(nums[i] - nums[i - 1])
        pref_bwd[i - 1] = pref_bwd[i] + cost

    ans = []
    for l, r in queries:
        if l == r:
            ans.append(0)
        elif l < r:
            ans.append(pref_fwd[r] - pref_fwd[l])
        else:
            ans.append(pref_bwd[r] - pref_bwd[l])
    return ans