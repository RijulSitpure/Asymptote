def frequencySort(nums: list[int]) -> list[int]:
    freq = {}
    for x in nums:
        freq[x] = freq.get(x, 0) + 1

    sorted_vals = sorted(freq.keys(), key=lambda x: (freq[x], -x))
    res = []
    for x in sorted_vals:
        res.extend([x] * freq[x])
    return res