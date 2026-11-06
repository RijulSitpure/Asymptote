def minDaysToScore(n: int) -> int:
    memo = {}

    def solve(target: int) -> int:
        if target <= 1:
            return target
        if target in memo:
            return memo[target]

        res = target  # by single steps
        res = min(res, 1 + (target % 2) + solve(target // 2))
        res = min(res, 1 + (target % 3) + solve(target // 3))
        memo[target] = res
        return res

    return solve(n)