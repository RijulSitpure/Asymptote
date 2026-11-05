class Solution:
    def makeAntiPalindrome(self, s: str) -> str:
        from collections import Counter
        n = len(s)
        cnt = Counter(s)
        if any(c > n // 2 for c in cnt.values()):
            return "-1"
        cs = sorted(s)
        m = n // 2
        if cs[m] != cs[m - 1]:
            return "".join(cs)
        i = m
        while i < n and cs[i] == cs[m]:
            i += 1
        j = m
        while j < n and cs[j] == cs[n - 1 - j]:
            if i >= n:
                return "-1"
            cs[i], cs[j] = cs[j], cs[i]
            i += 1
            j += 1
        return "".join(cs)
