class Solution:
    def distinctPrimeFactors(self, nums: list[int]) -> int:
        primes = set()
        for x in nums:
            d = 2
            while d * d <= x:
                if x % d == 0:
                    primes.add(d)
                    while x % d == 0:
                        x //= d
                d += 1
            if x > 1:
                primes.add(x)
        return len(primes)
