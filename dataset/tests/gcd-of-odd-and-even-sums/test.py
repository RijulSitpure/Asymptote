import math

class Solution:
    def gcdOfSums(self, n: int) -> int:
        k = (n + 1) // 2
        odd_sum = k * k
        m = n // 2
        even_sum = m * (m + 1)
        return math.gcd(odd_sum, even_sum)

def run_tests():
    sol = Solution()
    assert sol.gcdOfSums(4) == 2 # odds: 1+3=4, evens: 2+4=6, gcd(4, 6) = 2
    assert sol.gcdOfSums(5) == 3 # odds: 1+3+5=9, evens: 2+4=6, gcd(9, 6) = 3
    assert sol.gcdOfSums(1) == 1 # odds: 1, evens: 0, gcd(1, 0) = 1
    print("All tests passed for 3658.")

if __name__ == "__main__":
    run_tests()
