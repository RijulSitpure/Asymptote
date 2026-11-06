def findNearestDrone(drones: list[list[int]], target: list[int]) -> int:
    tx, ty = target
    best_dist = 10**15
    best_idx = -1
    for i, (x, y) in enumerate(drones):
        d = abs(x - tx) + abs(y - ty)
        if d < best_dist:
            best_dist = d
            best_idx = i
    return best_idx