def longestAlmostPalindrome(s: str) -> int:
    n = len(s)
    if n <= 2:
        return n
    max_len = 1
    def expand(left: int, right: int) -> int:
        mismatches = 0
        l, r = left, right
        cur_len = 0
        while l >= 0 and r < n:
            if s[l] != s[r]:
                mismatches += 1
                if mismatches > 1:
                    break
            cur_len = r - l + 1
            l -= 1
            r += 1
        return cur_len

    for i in range(n):
        max_len = max(max_len, expand(i, i))
        max_len = max(max_len, expand(i, i + 1))
    return max_len