def maxPrimeSubsetSize(nums: list[int]) -> int:
    primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]
    ones = nums.count(1)

    # Filter square-free numbers <= 30
    valid_nums = []
    for x in nums:
        if x <= 1 or x > 30:
            continue
        temp = x
        mask = 0
        is_sq_free = True
        for i, p in enumerate(primes):
            if temp % p == 0:
                temp //= p
                if temp % p == 0:
                    is_sq_free = False
                    break
                mask |= (1 << i)
        if is_sq_free:
            valid_nums.append(mask)

    # dp[mask]: max subset size using prime mask
    dp = [-1] * (1 << 10)
    dp[0] = 0

    for mask in valid_nums:
        for state in range((1 << 10) - 1, -1, -1):
            if dp[state] != -1 and (state & mask) == 0:
                if dp[state] + 1 > dp[state | mask]:
                    dp[state | mask] = dp[state] + 1

    max_size = max(dp)
    return max_size + ones if max_size != -1 else ones