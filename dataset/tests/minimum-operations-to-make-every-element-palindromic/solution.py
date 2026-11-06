def nearestPalindrome(x: int) -> int:
    s = str(x)
    n = len(s)
    candidates = {10**(n - 1) - 1, 10**n + 1}
    prefix = int(s[:(n + 1) // 2])
    for diff in (-1, 0, 1):
        p = str(prefix + diff)
        if n % 2 == 0:
            cand = int(p + p[::-1])
        else:
            cand = int(p + p[:-1][::-1])
        candidates.add(cand)

    best = min(candidates, key=lambda c: (abs(c - x), c))
    return best

def minOperationsToPalindromic(nums: list[int]) -> int:
    return sum(abs(x - nearestPalindrome(x)) for x in nums)