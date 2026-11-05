def numberOfZigZagArrays(n: int, l: int, r: int) -> int:
    MOD = 1_000_000_007
    m = r - l + 1
    if n <= 0 or m <= 0:
        return 0
    if n == 1:
        return m % MOD
    dp_inc = [v for v in range(m)]
    dp_dec = [m - 1 - v for v in range(m)]
    for step in range(3, n + 1):
        pref_dec = [0] * (m + 1)
        for i in range(m):
            pref_dec[i + 1] = (pref_dec[i] + dp_dec[i]) % MOD
        suff_inc = [0] * (m + 1)
        for i in range(m - 1, -1, -1):
            suff_inc[i] = (suff_inc[i + 1] + dp_inc[i]) % MOD
        new_inc = [pref_dec[v] for v in range(m)]
        new_dec = [suff_inc[v + 1] for v in range(m)]
        dp_inc = new_inc
        dp_dec = new_dec
    return (sum(dp_inc) + sum(dp_dec)) % MOD