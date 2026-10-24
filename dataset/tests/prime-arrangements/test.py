class Solution:
    def numPrimeArrangements(self, n: int) -> int:
        MOD = 10**9 + 7
        
        def is_prime(x):
            if x < 2:
                return False
            d = 2
            while d * d <= x:
                if x % d == 0:
                    return False
                d += 1
            return True
        
        p = sum(1 for i in range(1, n + 1) if is_prime(i))
        non_p = n - p
        
        res = 1
        for i in range(1, p + 1):
            res = (res * i) % MOD
        for i in range(1, non_p + 1):
            res = (res * i) % MOD
        return res

def test():
    sol = Solution()
    assert sol.numPrimeArrangements(5) == 12, "test 1 failed"
    assert sol.numPrimeArrangements(100) == 682289015, "test 2 failed"
    print("✓ prime-arrangements passed")

if __name__ == "__main__":
    test()
