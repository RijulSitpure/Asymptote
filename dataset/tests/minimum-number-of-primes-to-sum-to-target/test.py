class Solution:
    def minPrimes(self, target: int) -> int:
        def is_prime(n: int) -> bool:
            if n < 2:
                return False
            for d in range(2, int(n**0.5) + 1):
                if n % d == 0:
                    return False
            return True

        # Case 1: target itself is prime
        if is_prime(target):
            return 1
            
        # Case 2: Goldbach's conjecture - every even integer > 2 is sum of 2 primes
        if target % 2 == 0:
            return 2
            
        # Case 3: target is odd
        # If target - 2 is prime, then target = 2 + (target - 2) -> 2 primes
        if is_prime(target - 2):
            return 2
            
        # Otherwise by Vinogradov / Goldbach weak conjecture, sum of 3 primes
        return 3

def run_tests():
    s = Solution()
    res1 = s.minPrimes(7) # 7 is prime -> 1
    assert res1 == 1, f"Expected 1, got {res1}"
    res2 = s.minPrimes(4) # 4 = 2 + 2 -> 2
    assert res2 == 2, f"Expected 2, got {res2}"
    res3 = s.minPrimes(27) # 27 is odd, 27-2=25 not prime -> 3 (e.g. 3 + 5 + 19)
    assert res3 == 3, f"Expected 3, got {res3}"
    print("3610 minimum-number-of-primes-to-sum-to-target PASSED")

if __name__ == "__main__":
    run_tests()
