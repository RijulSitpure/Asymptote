def exactlyOneConsecutiveSetBitsPair(n: int) -> bool:
    pair_mask = n & (n >> 1)
    return pair_mask > 0 and (pair_mask & (pair_mask - 1)) == 0