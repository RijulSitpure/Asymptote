import bisect

def countIntersectingIntervalPairs(intervals: list[list[int]]) -> int:
    n = len(intervals)
    if n <= 1:
        return 0

    total_pairs = n * (n - 1) // 2
    # Disjoint pairs: interval A ends strictly before interval B starts (A.end < B.start)
    ends = sorted(iv[1] for iv in intervals)

    disjoint = 0
    for s, e in intervals:
        # number of intervals ending strictly before s
        disjoint += bisect.bisect_left(ends, s)

    return total_pairs - disjoint