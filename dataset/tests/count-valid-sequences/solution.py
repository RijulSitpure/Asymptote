def countValidSequences(n: int) -> int:
    MOD = 1_000_000_007
    if n <= 0:
        return 0
    # Values {0, 1, 2}. Valid transitions: difference <= 1
    # 0 -> 0, 1
    # 1 -> 0, 1, 2
    # 2 -> 1, 2
    dp = [1, 1, 1]
    for _ in range(1, n):
        c0, c1, c2 = dp
        dp = [
            (c0 + c1) % MOD,
            (c0 + c1 + c2) % MOD,
            (c1 + c2) % MOD
        ]
    return sum(dp) % MOD