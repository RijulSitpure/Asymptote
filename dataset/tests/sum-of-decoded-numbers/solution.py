def sumOfDecodedNumbers(s: str) -> int:
    MOD = 1_000_000_007
    n = len(s)
    if not s or s[0] == '0':
        return 0

    # dp_ways[i], dp_sum[i]
    w0, s0 = 1, 0 # base before string
    w1, s1 = 1, int(s[0])

    for i in range(1, n):
        w_cur, s_cur = 0, 0
        d1 = int(s[i])
        d2 = int(s[i-1:i+1])

        # 1-digit
        if 1 <= d1 <= 9:
            w_cur = (w_cur + w1) % MOD
            s_cur = (s_cur + s1 + w1 * d1) % MOD

        # 2-digit
        if 10 <= d2 <= 26:
            w_cur = (w_cur + w0) % MOD
            s_cur = (s_cur + s0 + w0 * d2) % MOD

        w0, s0 = w1, s1
        w1, s1 = w_cur, s_cur

    return s1 % MOD