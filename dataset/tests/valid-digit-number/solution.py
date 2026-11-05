def validDigitNumber(n: int, x: int) -> bool:
    s = str(n)
    target = str(x)
    if s[0] == target:
        return False
    return target in s