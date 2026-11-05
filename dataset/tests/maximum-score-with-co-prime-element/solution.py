import math

def maxScoreWithCoPrimeElement(nums: list[int], k: int) -> int:
    valid = [x for x in nums if math.gcd(x, k) == 1]
    if not valid:
        return 0
    pos_sum = sum(x for x in valid if x > 0)
    return pos_sum if pos_sum > 0 else max(valid)