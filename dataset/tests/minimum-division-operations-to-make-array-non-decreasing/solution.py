class Solution:
    def minOperations(self, nums: list[int]) -> int:
        max_v = max(nums)
        # Precompute smallest prime factor spf using linear sieve
        spf = list(range(max_v + 1))
        for i in range(2, int(max_v**0.5) + 1):
            if spf[i] == i:
                for j in range(i * i, max_v + 1, i):
                    if spf[j] == j:
                        spf[j] = i
                        
        ops = 0
        n = len(nums)
        for i in range(n - 2, -1, -1):
            if nums[i] > nums[i + 1]:
                # Dividing by greatest proper divisor leaves smallest prime factor
                p = spf[nums[i]]
                if p > nums[i + 1]:
                    return -1
                nums[i] = p
                ops += 1
                
        return ops
