class Solution:
    def primeSubOperation(self, nums: list[int]) -> bool:
        primes = []
        is_prime = [True] * 1005
        is_prime[0] = is_prime[1] = False
        for p in range(2, 1005):
            if is_prime[p]:
                primes.append(p)
                for multiple in range(p * p, 1005, p):
                    is_prime[multiple] = False
        prev = 0
        for x in nums:
            best_p = 0
            for p in primes:
                if p >= x:
                    break
                if x - p > prev:
                    best_p = p
            x -= best_p
            if x <= prev:
                return False
            prev = x
        return True
