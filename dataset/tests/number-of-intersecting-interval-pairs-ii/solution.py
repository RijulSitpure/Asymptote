import bisect

def countBipartiteIntersectingPairs(intervals_a: list[list[int]], intervals_b: list[list[int]]) -> int:
    n, m = len(intervals_a), len(intervals_b)
    total_pairs = n * m

    b_starts = sorted(iv[0] for iv in intervals_b)
    b_ends = sorted(iv[1] for iv in intervals_b)

    disjoint = 0
    for sa, ea in intervals_a:
        # B ends strictly before sa
        b_before_a = bisect.bisect_left(b_ends, sa)
        # B starts strictly after ea
        b_after_a = m - bisect.bisect_right(b_starts, ea)
        disjoint += b_before_a + b_after_a

    return total_pairs - disjoint