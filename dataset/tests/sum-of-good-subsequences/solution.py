class Solution:
    def sumOfGoodSubsequences(self, nums: list[int]) -> int:
        MOD = 1_000_000_007
        count = {}
        total_sum = {}
        
        for x in nums:
            c = 1 + count.get(x - 1, 0) + count.get(x + 1, 0)
            s = (x * c + total_sum.get(x - 1, 0) + total_sum.get(x + 1, 0)) % MOD
            count[x] = (count.get(x, 0) + c) % MOD
            total_sum[x] = (total_sum.get(x, 0) + s) % MOD
            
        return sum(total_sum.values()) % MOD
