def minOpsToSortBinaryString(s: str) -> int:
    is_sorted = all(s[i] <= s[i + 1] for i in range(len(s) - 1))
    return 0 if is_sorted else 1