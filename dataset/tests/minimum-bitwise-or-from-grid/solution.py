def minBitwiseOR(grid: list[list[int]]) -> int:
    ans = (1 << 30) - 1
    for b in range(29, -1, -1):
        target = ans ^ (1 << b)
        possible = True
        for row in grid:
            if not any((x | target) == target for x in row):
                possible = False
                break
        if possible:
            ans = target
    return ans