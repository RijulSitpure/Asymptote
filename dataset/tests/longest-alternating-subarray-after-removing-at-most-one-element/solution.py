def longestAlternatingSubarray(nums: list[int]) -> int:
    n = len(nums)
    if n <= 2:
        return n
    pref = [1] * n
    for i in range(1, n):
        if nums[i] % 2 != nums[i - 1] % 2:
            pref[i] = pref[i - 1] + 1
    suff = [1] * n
    for i in range(n - 2, -1, -1):
        if nums[i] % 2 != nums[i + 1] % 2:
            suff[i] = suff[i + 1] + 1
    ans = max(max(pref), max(suff))
    ans = max(ans, suff[1], pref[n - 2])
    for i in range(1, n - 1):
        if nums[i - 1] % 2 != nums[i + 1] % 2:
            ans = max(ans, pref[i - 1] + suff[i + 1])
        else:
            ans = max(ans, pref[i - 1], suff[i + 1])
    return ans