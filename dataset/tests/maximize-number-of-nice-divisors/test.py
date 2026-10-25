class Solution:
    def maxNiceDivisors(self, primeFactors: int) -> int:
        if primeFactors <= 3:
            return primeFactors
        MOD = 10**9 + 7
        q, r = divmod(primeFactors, 3)
        if r == 0:
            return pow(3, q, MOD)
        elif r == 1:
            return (4 * pow(3, q - 1, MOD)) % MOD
        else:
            return (2 * pow(3, q, MOD)) % MOD

def test():
    sol = Solution()
    assert sol.maxNiceDivisors(5) == 6
    assert sol.maxNiceDivisors(8) == 18

if __name__ == '__main__':
    test()
