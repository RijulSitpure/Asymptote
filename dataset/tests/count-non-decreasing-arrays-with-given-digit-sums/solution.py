def countArrays(digit_sums: list[int], max_val: int = 50) -> int:
    MOD = 1_000_000_007
    def get_digit_sum(x: int) -> int:
        return sum(int(d) for d in str(x))
        
    candidates = []
    for target in digit_sums:
        valid = [x for x in range(max_val + 1) if get_digit_sum(x) == target]
        candidates.append(valid)
        
    if not candidates[0]:
        return 0
    dp = {x: 1 for x in candidates[0]}
    for cand in candidates[1:]:
        next_dp = {}
        for y in cand:
            next_dp[y] = sum(count for x, count in dp.items() if x <= y) % MOD
        dp = next_dp
    return sum(dp.values()) % MOD