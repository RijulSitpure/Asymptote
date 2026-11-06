def largestIntegerWithDigitSum(n: int, s: int) -> str:
    if s < 0 or s > 9 * n:
        return ""
    if s == 0 and n > 1:
        return ""
    digits = []
    rem = s
    for _ in range(n):
        d = min(9, rem)
        digits.append(str(d))
        rem -= d
    return "".join(digits) if rem == 0 else "" 