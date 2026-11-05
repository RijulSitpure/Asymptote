def minEnergy(n: int, brightness: int, intervals: list[list[int]]) -> int:
    if not intervals:
        return 0
    intervals.sort()
    merged = []
    cur_s, cur_e = intervals[0]
    for s, e in intervals[1:]:
        if s <= cur_e:
            cur_e = max(cur_e, e)
        else:
            merged.append((cur_s, cur_e))
            cur_s, cur_e = s, e
    merged.append((cur_s, cur_e))
    total_coverage = sum(e - s + 1 for s, e in merged)
    return total_coverage * brightness