class Solution:
    def missingRolls(self, rolls: list[int], mean: int, n: int) -> list[int]:
        total_sum = mean * (len(rolls) + n)
        missing_sum = total_sum - sum(rolls)
        if missing_sum < n or missing_sum > 6 * n:
            return []
        base = missing_sum // n
        rem = missing_sum % n
        return [base + 1] * rem + [base] * (n - rem)
