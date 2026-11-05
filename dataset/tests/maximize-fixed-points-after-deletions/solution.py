from bisect import bisect_right

def maxFixedPoints(nums: list[int]) -> int:
    candidates = []
    for i, v in enumerate(nums):
        if v <= i and v >= 0:
            d = i - v
            candidates.append((v, d))
    candidates.sort(key=lambda item: (item[0], -item[1]))
    tails = []
    for _, d in candidates:
        idx = bisect_right(tails, d)
        if idx == len(tails):
            tails.append(d)
        else:
            tails[idx] = d
    return len(tails)