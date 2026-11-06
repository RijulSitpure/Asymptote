def countEquallySpacedValuesII(nums: list[int], min_count: int) -> int:
    indices = {}
    for i, x in enumerate(nums):
        indices.setdefault(x, []).append(i)

    valid = 0
    for x, pos in indices.items():
        if len(pos) < min_count:
            continue
        if len(pos) <= 2:
            valid += 1
        else:
            diff = pos[1] - pos[0]
            if all(pos[i] - pos[i - 1] == diff for i in range(2, len(pos))):
                valid += 1
    return valid