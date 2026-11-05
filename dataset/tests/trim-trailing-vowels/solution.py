def trimTrailingVowels(s: str) -> str:
    vowels = set("aeiouAEIOU")
    idx = len(s) - 1
    while idx >= 0 and s[idx] in vowels:
        idx -= 1
    return s[:idx + 1]