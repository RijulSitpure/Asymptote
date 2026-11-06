def minInversionsPrefixTree(nums: list[int]) -> int:
    # Build trie and calculate inversions per bit level
    # For each bit level from 29 down to 0:
    # count pairs (i < j) where bit at level differs
    n = len(nums)
    if n <= 1:
        return 0

    total_inv = 0
    # Group indices by prefix
    groups = [nums]

    for bit in range(29, -1, -1):
        inv01 = 0
        inv10 = 0
        next_groups = []

        for grp in groups:
            c0 = 0
            c1 = 0
            g0 = []
            g1 = []
            for x in grp:
                if (x >> bit) & 1:
                    inv01 += c0
                    c1 += 1
                    g1.append(x)
                else:
                    inv10 += c1
                    c0 += 1
                    g0.append(x)
            if g0:
                next_groups.append(g0)
            if g1:
                next_groups.append(g1)

        total_inv += min(inv01, inv10)
        groups = next_groups

    return total_inv