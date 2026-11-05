def maxTeamSize(intervals: list[list[int]]) -> int:
    events = []
    for s, e in intervals:
        events.append((s, 1))
        events.append((e + 1, -1))
    events.sort()
    cur = 0
    max_team = 0
    for t, delta in events:
        cur += delta
        max_team = max(max_team, cur)
    return max_team