from typing import List

class Solution:
    def splitByPrimes(self, nums: List[int]) -> List[List[int]]:
        n = len(nums)
        if n == 0:
            return []
            
        is_prime = [True] * n
        if n > 0: is_prime[0] = False
        if n > 1: is_prime[1] = False
        for i in range(2, int(n**0.5) + 1):
            if is_prime[i]:
                for j in range(i * i, n, i):
                    is_prime[j] = False
                    
        res = []
        curr = []
        for i, x in enumerate(nums):
            if is_prime[i]:
                if curr:
                    res.append(curr)
                curr = [x]
            else:
                curr.append(x)
        if curr:
            res.append(curr)
        return res

def run_tests():
    s = Solution()
    # indices: 0: 10, 1: 20, 2: 30 (prime), 3: 40 (prime), 4: 50
    res1 = s.splitByPrimes([10, 20, 30, 40, 50])
    assert res1 == [[10, 20], [30], [40, 50]], f"Expected [[10, 20], [30], [40, 50]], got {res1}"
    print("3618 split-array-by-prime-indices PASSED")

if __name__ == "__main__":
    run_tests()
