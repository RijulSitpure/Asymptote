def elevatorTotalTravel(requests: list[int], start_floor: int) -> int:
    cur = start_floor
    total = 0
    for req in requests:
        total += abs(req - cur)
        cur = req
    return total