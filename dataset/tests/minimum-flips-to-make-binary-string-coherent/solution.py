def minFlipsToMakeCoherent(s: str) -> int:
    n = len(s)
    total_ones = s.count('1')
    total_zeros = n - total_ones
    ans = total_ones
    ans = min(ans, total_zeros)
    if total_ones > 0:
        ans = min(ans, total_ones - 1)
    if n >= 2:
        cost = (0 if s[0] == '1' else 1) + (0 if s[-1] == '1' else 1)
        cost += s[1:-1].count('1')
        ans = min(ans, cost)
    return ans