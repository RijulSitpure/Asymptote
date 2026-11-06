def countRobotGroups(robots: list[list[int]]) -> int:
    # Each robot: [position, radius]. Interval: [pos - radius, pos + radius]
    if not robots:
        return 0

    intervals = [[pos - r, pos + r] for pos, r in robots]
    intervals.sort(key=lambda x: x[0])

    groups = 1
    current_end = intervals[0][1]

    for start, end in intervals[1:]:
        if start <= current_end:
            current_end = max(current_end, end)
        else:
            groups += 1
            current_end = end

    return groups