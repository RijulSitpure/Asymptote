class Solution:
    def smallestValue(self, n: int) -> int:
        while True:
            total = 0
            temp = n
            d = 2
            while d * d <= temp:
                while temp % d == 0:
                    total += d
                    temp //= d
                d += 1
            if temp > 1:
                total += temp
            if total == n:
                return n
            n = total
