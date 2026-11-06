def countShadowPairs(nums: list[int]) -> int:
    freq = {}
    pairs = 0
    for i, x in enumerate(nums):
        key = x - i
        pairs += freq.get(key, 0)
        freq[key] = freq.get(key, 0) + 1
    return pairs