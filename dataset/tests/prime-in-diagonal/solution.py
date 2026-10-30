class Solution:
    def diagonalPrime(self, nums: list[list[int]]) -> int:
        def is_prime(x):
            if x < 2:
                return False
            d = 2
            while d * d <= x:
                if x % d == 0:
                    return False
                d += 1
            return True
        n = len(nums)
        max_p = 0
        for i in range(n):
            v1 = nums[i][i]
            v2 = nums[i][n - 1 - i]
            if is_prime(v1):
                max_p = max(max_p, v1)
            if is_prime(v2):
                max_p = max(max_p, v2)
        return max_p
