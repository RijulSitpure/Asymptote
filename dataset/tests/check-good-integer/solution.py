def checkGoodInteger(n: int) -> bool:
    s = str(n)
    if len(s) != len(set(s)):
        return False
    for i in range(1, len(s)):
        if (int(s[i]) % 2) == (int(s[i - 1]) % 2):
            return False
    return True