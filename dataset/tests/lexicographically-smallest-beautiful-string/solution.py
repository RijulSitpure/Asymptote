class Solution:
    def smallestBeautifulString(self, s: str, k: int) -> str:
        a = [ord(c) - ord('a') for c in s]
        n = len(a)
        i = n - 1
        a[i] += 1
        while i < n:
            if a[i] == k:
                if i == 0:
                    return ''
                a[i] = 0
                i -= 1
                a[i] += 1
            elif (i > 0 and a[i] == a[i - 1]) or (i > 1 and a[i] == a[i - 2]):
                a[i] += 1
            else:
                i += 1
        return ''.join(chr(ord('a') + v) for v in a)
