def minInitialStrength(damage: list[int], armor: int) -> int:
    total_dmg = sum(damage)
    max_single = max(damage)
    absorb = min(max_single, armor)
    return total_dmg - absorb + 1