class Solution:
    def closestPrimes(self, left: int, right: int) -> list[int]:
        is_prime = [True] * (right + 1)
        is_prime[0] = is_prime[1] = False
        for i in range(2, int(right**0.5) + 1):
            if is_prime[i]:
                for j in range(i * i, right + 1, i):
                    is_prime[j] = False
        primes = [i for i in range(left, right + 1) if is_prime[i]]
        if len(primes) < 2:
            return [-1, -1]
        best_diff = float('inf')
        ans = [-1, -1]
        for i in range(len(primes) - 1):
            d = primes[i + 1] - primes[i]
            if d < best_diff:
                best_diff = d
                ans = [primes[i], primes[i + 1]]
                if d <= 2:
                    break
        return ans
