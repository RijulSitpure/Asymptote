def maxManhattanDistance(moves: str) -> int:
    x = 0
    y = 0
    best = 0
    for m in moves:
        if m == 'N':
            y += 1
        elif m == 'S':
            y -= 1
        elif m == 'E':
            x += 1
        elif m == 'W':
            x -= 1
        best = max(best, abs(x) + abs(y))
    return best