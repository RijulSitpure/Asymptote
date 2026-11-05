def filterOccupiedIntervals(intervals: list[list[int]]) -> list[list[int]]:
    if not intervals:
        return []
    intervals.sort()
    res = [intervals[0]]
    for start, end in intervals[1:]:
        if start <= res[-1][1]:
            res[-1][1] = max(res[-1][1], end)
        else:
            res.append([start, end])
    return res