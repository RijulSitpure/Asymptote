def minCapacityBox(packages: list[int], boxes: list[int]) -> int:
    max_p = max(packages)
    valid = [b for b in boxes if b >= max_p]
    return min(valid) if valid else -1