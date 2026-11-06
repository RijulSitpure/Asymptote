def waysToPartition(nums: list[int], k: int) -> int:
    n = len(nums)
    pref = [0] * n
    pref[0] = nums[0]
    for i in range(1, n):
        pref[i] = pref[i - 1] + nums[i]
    total = pref[-1]

    # diff[i] = pref[i] - (total - pref[i]) = 2*pref[i] - total
    # splits where diff == 0 without change
    right_diff = {}
    for i in range(n - 1):
        d = 2 * pref[i] - total
        right_diff[d] = right_diff.get(d, 0) + 1

    ans = right_diff.get(0, 0)
    left_diff = {}

    for i in range(n):
        diff = k - nums[i]
        curr = left_diff.get(diff, 0) + right_diff.get(-diff, 0)
        ans = max(ans, curr)
        if i < n - 1:
            d = 2 * pref[i] - total
            right_diff[d] -= 1
            left_diff[d] = left_diff.get(d, 0) + 1

    return ans