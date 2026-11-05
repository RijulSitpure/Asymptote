def countSubarraysWithMatchingSumDigits(nums: list[int], target_digit_sum: int) -> int:
    def digit_sum(x: int) -> int:
        return sum(int(c) for c in str(abs(x)))

    n = len(nums)
    ans = 0
    for i in range(n):
        cur = 0
        for j in range(i, n):
            cur += nums[j]
            if digit_sum(cur) == target_digit_sum:
                ans += 1
    return ans