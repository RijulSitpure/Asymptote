def passwordStrength(password: str) -> int:
    distinct_chars = set(password)
    ans = 0
    for ch in distinct_chars:
        if ch.islower():
            ans += 1
        elif ch.isupper():
            ans += 2
        elif ch.isdigit():
            ans += 3
        elif ch in "!@#$":
            ans += 5
    return ans