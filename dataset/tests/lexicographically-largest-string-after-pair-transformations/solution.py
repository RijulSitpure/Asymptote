def getLargestString(s: str) -> str:
    chars = list(s)
    for i in range(len(chars) - 1):
        if chars[i] < chars[i + 1] and (int(chars[i]) % 2 == int(chars[i + 1]) % 2):
            chars[i], chars[i + 1] = chars[i + 1], chars[i]
            break
    return "".join(chars)