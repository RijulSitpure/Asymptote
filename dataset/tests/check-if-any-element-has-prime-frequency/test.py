from typing import List
from collections import Counter

class Solution:
    def hasPrimeFrequency(self, nums: List[int]) -> bool:
        counts = Counter(nums)
        
        def is_prime(val: int) -> bool:
            if val < 2:
                return False
            for d in range(2, int(val**0.5) + 1):
                if val % d == 0:
                    return False
            return True

        return any(is_prime(freq) for freq in counts.values())

def run_tests():
    s = Solution()
    res1 = s.hasPrimeFrequency([1, 1, 2]) # 1 appears 2 times (2 is prime)
    assert res1 is True, f"Expected True, got {res1}"
    res2 = s.hasPrimeFrequency([1, 1, 1, 1]) # 1 appears 4 times (4 is composite)
    assert res2 is False, f"Expected False, got {res2}"
    print("3591 check-if-any-element-has-prime-frequency PASSED")

if __name__ == "__main__":
    run_tests()
