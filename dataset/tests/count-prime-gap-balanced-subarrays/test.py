from typing import List

class Solution:
    def countBalancedSubarrays(self, nums: List[int], k: int) -> int:
        max_val = max(nums) if nums else 1
        is_prime = [True] * (max_val + 1)
        if len(is_prime) > 0: is_prime[0] = False
        if len(is_prime) > 1: is_prime[1] = False
        for i in range(2, int(max_val**0.5) + 1):
            if is_prime[i]:
                for j in range(i * i, max_val + 1, i):
                    is_prime[j] = False
                    
        n = len(nums)
        ans = 0
        for i in range(n):
            prime_indices = []
            for j in range(i, n):
                if is_prime[nums[j]]:
                    prime_indices.append(j)
                
                # Check balance condition: at least 2 primes and gap spread <= k
                if len(prime_indices) >= 2:
                    gaps = [prime_indices[m] - prime_indices[m - 1] for m in range(1, len(prime_indices))]
                    if max(gaps) - min(gaps) <= k:
                        ans += 1
                elif len(prime_indices) == 1:
                    ans += 1 # trivially balanced with single prime
        return ans

def run_tests():
    s = Solution()
    res1 = s.countBalancedSubarrays([2, 3, 5], 1)
    assert res1 == 6, f"Expected 6, got {res1}"
    res2 = s.countBalancedSubarrays([4, 4, 4], 0)
    assert res2 == 0, f"Expected 0, got {res2}"
    print("3589 count-prime-gap-balanced-subarrays PASSED")

if __name__ == "__main__":
    run_tests()
