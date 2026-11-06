def longestSubarrayDivKWithOneNegationII(nums: list[int], k: int) -> int:
    n = len(nums)
    # first[rem][negated]: earliest index
    # 0 negations: simple prefix sum mod k
    first0 = {0: -1}
    pref = 0
    max_len = 0

    for i, x in enumerate(nums):
        pref = (pref + x) % k
        if pref in first0:
            max_len = max(max_len, i - first0[pref])
        else:
            first0[pref] = i

    # With 1 negation:
    # A subarray nums[l..r] with nums[m] negated has sum = (pref[r] - pref[l-1]) - 2*nums[m] == 0 (mod k)
    # pref[r] - 2*nums[m] == pref[l-1] (mod k) with l-1 < m <= r
    # Maintain earliest occurrence of pref[l-1]
    # For moderate k:
    first_pref = [float('inf')] * k
    first_pref[0] = -1

    running = 0
    for r in range(n):
        running = (running + nums[r]) % k
        # without negation:
        if first_pref[running] != float('inf'):
            max_len = max(max_len, r - first_pref[running])

        # with negation of nums[m]:
        req = (running - 2 * nums[r]) % k
        if first_pref[req] != float('inf'):
            max_len = max(max_len, r - first_pref[req])

        if first_pref[running] == float('inf'):
            first_pref[running] = r

    return max_len