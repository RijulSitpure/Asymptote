def minOpsRotatedPalindromeOptimal(s: str) -> int:
    n = len(s)
    best = n
    doubled = s + s
    for shift in range(n):
        diffs = 0
        for i in range(n // 2):
            if doubled[shift + i] != doubled[shift + n - 1 - i]:
                diffs += 1
        best = min(best, diffs)
    return best