from collections import Counter

def maxEqualRowsAfterFlips(matrix: list[list[int]]) -> int:
    counts = Counter()
    for row in matrix:
        # Normalize so first element is 0
        if row[0] == 0:
            key = tuple(row)
        else:
            key = tuple(1 - x for x in row)
        counts[key] += 1
    return max(counts.values())