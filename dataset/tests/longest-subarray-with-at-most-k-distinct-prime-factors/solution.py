from collections import Counter

def longestSubarrayAtMostKPrimes(nums: list[int], k: int) -> int:
    def get_prime_factors(x: int) -> set[int]:
        primes = set()
        d = 2
        while d * d <= x:
            if x % d == 0:
                primes.add(d)
                while x % d == 0:
                    x //= d
            d += 1
        if x > 1:
            primes.add(x)
        return primes

    factors = [get_prime_factors(x) for x in nums]
    prime_counts = Counter()
    left = 0
    max_len = 0
    for right in range(len(nums)):
        for p in factors[right]:
            prime_counts[p] += 1
        while len(prime_counts) > k:
            for p in factors[left]:
                prime_counts[p] -= 1
                if prime_counts[p] == 0:
                    del prime_counts[p]
            left += 1
        max_len = max(max_len, right - left + 1)
    return max_len