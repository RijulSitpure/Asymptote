def longestArithmeticSubarray(nums: list[int]) -> int:
    n = len(nums)
    if n <= 2:
        return n
    ans = 2
    for i in range(n):
        for j in range(i + 1, min(n, i + 3)):
            step = (nums[j] - nums[i]) // (j - i)
            # count longest run from i using step with at most 1 modification
            l = 0
            # test forward
            mod_used = 0
            cur_len = 0
            cur_val = nums[i]
            for k in range(i, n):
                expected = nums[i] + (k - i) * step
                if nums[k] == expected:
                    cur_len += 1
                else:
                    if mod_used == 0:
                        mod_used = 1
                        cur_len += 1
                    else:
                        break
            ans = max(ans, cur_len)
    return min(n, ans)