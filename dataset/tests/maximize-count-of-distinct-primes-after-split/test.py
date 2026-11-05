from typing import List

class Solution:
    def maxDistinctPrimeCount(self, nums: List[int]) -> int:
        max_val = max(nums) if nums else 1
        spf = list(range(max_val + 1))
        for i in range(2, int(max_val**0.5) + 1):
            if spf[i] == i:
                for j in range(i * i, max_val + 1, i):
                    if spf[j] == j:
                        spf[j] = i
        
        def get_factors(x: int) -> set:
            factors = set()
            while x > 1:
                p = spf[x]
                factors.add(p)
                while x % p == 0:
                    x //= p
            return factors

        num_factors = [get_factors(x) for x in nums]
        n = len(nums)
        if n < 2:
            return 0
        
        pref_sets = [set() for _ in range(n)]
        running = set()
        for i in range(n):
            running = running | num_factors[i]
            pref_sets[i] = set(running)
            
        suff_sets = [set() for _ in range(n)]
        running = set()
        for i in range(n - 1, -1, -1):
            running = running | num_factors[i]
            suff_sets[i] = set(running)
            
        best = 0
        for i in range(n - 1):
            best = max(best, len(pref_sets[i]) + len(suff_sets[i + 1]))
        return best

def run_tests():
    s = Solution()
    res1 = s.maxDistinctPrimeCount([2, 3, 5, 7])
    assert res1 == 4, f"Expected 4, got {res1}"
    res2 = s.maxDistinctPrimeCount([6, 10, 15])
    assert res2 == 5, f"Expected 5, got {res2}"
    print("3569 maximize-count-of-distinct-primes-after-split PASSED")

if __name__ == "__main__":
    run_tests()
