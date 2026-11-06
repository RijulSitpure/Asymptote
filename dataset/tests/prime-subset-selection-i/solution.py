def numberOfGoodSubsets(nums: list[int]) -> int:
    MOD = 1_000_000_007
    primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]

    freq = [0] * 31
    for x in nums:
        if x <= 30:
            freq[x] += 1

    mask_map = {}
    for x in range(2, 31):
        if freq[x] == 0:
            continue
        temp = x
        m = 0
        valid = True
        for i, p in enumerate(primes):
            if temp % p == 0:
                temp //= p
                if temp % p == 0:
                    valid = False
                    break
                m |= (1 << i)
        if valid:
            mask_map[x] = m

    dp = [0] * (1 << 10)
    dp[0] = 1

    for x, mask in mask_map.items():
        count = freq[x]
        for state in range((1 << 10) - 1, -1, -1):
            if (state & mask) == 0:
                dp[state | mask] = (dp[state | mask] + dp[state] * count) % MOD

    ans = (sum(dp[1:]) * pow(2, freq[1], MOD)) % MOD
    return ans