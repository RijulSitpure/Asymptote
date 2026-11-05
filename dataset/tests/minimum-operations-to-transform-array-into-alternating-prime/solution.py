import bisect

def minOperationsAlternatingPrime(nums: list[int]) -> int:
    MAX_V = 200_000
    is_prime = [True] * (MAX_V + 1)
    is_prime[0] = is_prime[1] = False
    for i in range(2, int(MAX_V**0.5) + 1):
        if is_prime[i]:
            for j in range(i * i, MAX_V + 1, i):
                is_prime[j] = False
    primes = [i for i, p in enumerate(is_prime) if p]

    def cost_to_prime(x: int) -> int:
        idx = bisect.bisect_left(primes, x)
        best = abs(x - primes[idx])
        if idx > 0:
            best = min(best, abs(x - primes[idx - 1]))
        return best

    def cost_to_non_prime(x: int) -> int:
        if not is_prime[x]:
            return 0
        return 1

    cost0 = 0
    cost1 = 0
    for i, x in enumerate(nums):
        cp = cost_to_prime(x)
        cnp = cost_to_non_prime(x)
        if i % 2 == 0:
            cost0 += cp
            cost1 += cnp
        else:
            cost0 += cnp
            cost1 += cp
    return min(cost0, cost1)