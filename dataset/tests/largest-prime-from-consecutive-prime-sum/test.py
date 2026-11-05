class Solution:
    def largestConsecutivePrimeSum(self, n: int) -> int:
        sieve = [True] * (n + 1)
        sieve[0] = sieve[1] = False
        for p in range(2, int(n**0.5) + 1):
            if sieve[p]:
                for m in range(p * p, n + 1, p):
                    sieve[m] = False
        
        primes = [p for p in range(2, n + 1) if sieve[p]]
        pref = [0]
        for p in primes:
            pref.append(pref[-1] + p)
        
        num_primes = len(primes)
        for length in range(num_primes, 0, -1):
            for start in range(num_primes - length + 1):
                cur_sum = pref[start + length] - pref[start]
                if cur_sum > n:
                    break
                if sieve[cur_sum]:
                    return cur_sum
        return -1

def run_tests():
    sol = Solution()
    assert sol.largestConsecutivePrimeSum(100) == 41 # 2+3+5+7+11+13 = 41 (6 consecutive primes)
    assert sol.largestConsecutivePrimeSum(10) == 5 # 2+3 = 5
    print("All tests passed for 3770.")

if __name__ == "__main__":
    run_tests()
