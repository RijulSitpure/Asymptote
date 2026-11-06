def largestPowerArray(nums: list[int], limit: int) -> list[int]:
    n = len(nums)
    sorted_pairs = sorted([(nums[i], i) for i in range(n)])

    groups = []
    curr_group = [sorted_pairs[0]]
    for i in range(1, n):
        if sorted_pairs[i][0] - sorted_pairs[i - 1][0] <= limit:
            curr_group.append(sorted_pairs[i])
        else:
            groups.append(curr_group)
            curr_group = [sorted_pairs[i]]
    groups.append(curr_group)

    res = [0] * n
    for group in groups:
        indices = sorted([idx for val, idx in group])
        values = sorted([val for val, idx in group], reverse=True)
        for idx, val in zip(indices, values):
            res[idx] = val

    return res