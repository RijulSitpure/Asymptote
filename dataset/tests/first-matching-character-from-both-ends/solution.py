def firstMatchingChar(s: str) -> int:
    n = len(s)
    for i in range(n // 2 + (1 if n % 2 != 0 else 0)):
        if s[i] == s[n - 1 - i]:
            return i
    return -1