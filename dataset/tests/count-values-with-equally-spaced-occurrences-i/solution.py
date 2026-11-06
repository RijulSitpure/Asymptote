def countEquallySpacedValues(nums: list[int]) -> int:
    indices = {}
    for i, x in enumerate(nums):
        indices.setdefault(x, []).append(i)

    count = 0
    for x, pos in indices.items():
        if len(pos) <= 2:
            count += 1
        else:
            diff = pos[1] - pos[0]
            if all(pos[i] - pos[i - 1] == diff for i in range(2, len(pos))):
                count += 1
    return count