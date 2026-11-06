def minRotationsToDial(target: str) -> int:
    curr = 0
    total_rotations = 0

    for ch in target:
        dig = int(ch)
        diff = abs(curr - dig)
        total_rotations += min(diff, 10 - diff)
        curr = dig

    return total_rotations