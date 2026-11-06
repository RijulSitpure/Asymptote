def minElevatorCost(requests: list[int], capacity: int) -> int:
    requests.sort(reverse=True)
    total = 0
    for i in range(0, len(requests), capacity):
        total += 2 * requests[i]
    return total