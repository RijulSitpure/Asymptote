def countValidPrefixes(s: str) -> int:
    vowels = set("aeiouAEIOU")
    v_count = 0
    c_count = 0
    ans = 0
    for ch in s:
        if ch in vowels:
            v_count += 1
        elif ch.isalpha():
            c_count += 1
        if v_count > c_count:
            ans += 1
    return ans