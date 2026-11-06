def minElevatorRounds(requests: list[int], capacity: int) -> int:
    n = len(requests)
    return (n + capacity - 1) // capacity