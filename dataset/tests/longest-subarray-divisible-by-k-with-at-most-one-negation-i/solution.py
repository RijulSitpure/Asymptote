def longestSubarrayDivKWithOneNegation(nums: list[int], k: int) -> int:
    n = len(nums)
    # Earliest index for each remainder without negation
    first_occ = {0: -1}
    pref = 0
    max_len = 0

    # 1. Without negation
    for i, x in enumerate(nums):
        pref = (pref + x) % k
        if pref in first_occ:
            max_len = max(max_len, i - first_occ[pref])
        else:
            first_occ[pref] = i

    # 2. With one negation: for each candidate subarray ending at r
    # For small n (version I), evaluate directly
    for l in range(n):
        curr_sum = 0
        min_elem = float('inf')
        for r in range(l, n):
            curr_sum += nums[r]
            # test no negation
            if curr_sum % k == 0:
                max_len = max(max_len, r - l + 1)
            # test negating any element inside [l, r]
            for m_idx in range(l, r + 1):
                if (curr_sum - 2 * nums[m_idx]) % k == 0:
                    max_len = max(max_len, r - l + 1)
                    break
    return max_len