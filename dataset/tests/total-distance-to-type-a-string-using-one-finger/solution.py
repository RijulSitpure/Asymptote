def totalDistance(word: str) -> int:
    def get_pos(c: str) -> tuple[int, int]:
        idx = ord(c) - ord('a')
        return (idx // 6, idx % 6)
    
    total = 0
    for i in range(1, len(word)):
        r1, c1 = get_pos(word[i - 1])
        r2, c2 = get_pos(word[i])
        total += abs(r1 - r2) + abs(c1 - c2)
    return total