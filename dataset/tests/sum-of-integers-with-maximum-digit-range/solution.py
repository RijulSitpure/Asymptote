def sumWithMaxDigitRange(nums: list[int]) -> int:
    def digit_spread(x: int) -> int:
        digits = [int(c) for c in str(abs(x))]
        return max(digits) - min(digits)

    spreads = [digit_spread(x) for x in nums]
    max_spread = max(spreads)
    return sum(nums[i] for i in range(len(nums)) if spreads[i] == max_spread)