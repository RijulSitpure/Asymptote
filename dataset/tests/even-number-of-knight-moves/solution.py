def canReachInEvenKnightMoves(start_pos: list[int], end_pos: list[int]) -> bool:
    r1, c1 = start_pos
    r2, c2 = end_pos
    return ((r1 + c1) % 2) == ((r2 + c2) % 2)