def checkAsciiPalindromic(s: str) -> bool:
    l = 0
    r = len(s) - 1
    while l < r:
        if ord(s[l]) != ord(s[r]):
            return False
        l += 1
        r -= 1
    return True