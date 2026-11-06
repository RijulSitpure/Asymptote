def unfinishedTasksAfterShifts(incoming: list[int], capacity: list[int]) -> list[int]:
    backlog = 0
    res = []
    for inc, cap in zip(incoming, capacity):
        backlog = max(0, backlog + inc - cap)
        res.append(backlog)
    return res