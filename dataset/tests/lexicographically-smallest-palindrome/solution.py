class Solution:
    def makeSmallestPalindrome(self, s: str) -> str:
        a = list(s)
        l, r = 0, len(a) - 1
        while l < r:
            if a[l] != a[r]:
                m = min(a[l], a[r])
                a[l] = m
                a[r] = m
            l += 1
            r -= 1
        return ''.join(a)
