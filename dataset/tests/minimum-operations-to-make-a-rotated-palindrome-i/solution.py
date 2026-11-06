def minOpsRotatedPalindrome(s: str) -> int:
    n = len(s)
    best = n
    for shift in range(n):
        rot = s[shift:] + s[:shift]
        diffs = sum(1 for i in range(n // 2) if rot[i] != rot[n - 1 - i])
        best = min(best, diffs)
    return best