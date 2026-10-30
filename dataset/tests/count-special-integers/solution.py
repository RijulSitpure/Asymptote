class Solution:
    def countSpecialNumbers(self, n: int) -> int:
        s = str(n)
        L = len(s)
        ans = 0
        for k in range(1, L):
            prod = 9
            avail = 9
            for _ in range(k - 1):
                prod *= avail
                avail -= 1
            ans += prod
        seen = set()
        for i, ch in enumerate(s):
            digit = int(ch)
            start = 1 if i == 0 else 0
            for d in range(start, digit):
                if d not in seen:
                    avail = 10 - (i + 1)
                    prod = 1
                    for _ in range(L - 1 - i):
                        prod *= avail
                        avail -= 1
                    ans += prod
            if digit in seen:
                break
            seen.add(digit)
        else:
            ans += 1
        return ans
