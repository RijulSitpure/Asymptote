class Solution:
    def sumOfLargestPrimes(self, s: str) -> int:
        def is_prime(x: int) -> bool:
            if x <= 1:
                return False
            for d in range(2, int(x**0.5) + 1):
                if x % d == 0:
                    return False
            return True

        primes = set()
        n = len(s)
        for i in range(n):
            for j in range(i + 1, n + 1):
                val = int(s[i:j])
                if is_prime(val):
                    primes.add(val)

        return sum(sorted(primes, reverse=True)[:3])

def run_tests():
    s = Solution()
    res = s.sumOfLargestPrimes("12345")
    assert res == 31, f"Expected 31, got {res}"
    print("3556 sum-of-largest-prime-substrings PASSED")

if __name__ == "__main__":
    run_tests()
