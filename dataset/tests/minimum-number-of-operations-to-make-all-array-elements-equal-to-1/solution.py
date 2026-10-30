class Solution:
    def minOperations(self, nums: list[int]) -> int:
        import math
        n = len(nums)
        c1 = nums.count(1)
        if c1 > 0:
            return n - c1
        min_len = float('inf')
        for i in range(n):
            g = nums[i]
            for j in range(i + 1, n):
                g = math.gcd(g, nums[j])
                if g == 1:
                    min_len = min(min_len, j - i + 1)
                    break
        if min_len == float('inf'):
            return -1
        return min_len - 1 + n - 1
