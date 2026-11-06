def minRotationsToDialModM(target: list[int], m: int) -> int:
    curr = 0
    total = 0
    for dig in target:
        diff = abs(curr - dig)
        total += min(diff, m - diff)
        curr = dig
    return total