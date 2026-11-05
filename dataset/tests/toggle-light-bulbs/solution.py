def minFlips(bulbs: list[int]) -> int:
    flips = 0
    for b in bulbs:
        if (b + flips) % 2 == 0:
            flips += 1
    return flips