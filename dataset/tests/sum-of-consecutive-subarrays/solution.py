class Solution:
    def getSum(self, nums: list[int]) -> int:
        MOD = 1_000_000_007
        n = len(nums)
        if n == 0:
            return 0
            
        def sum_consecutive(diff: int) -> int:
            total = 0
            curr_sum = nums[0]
            curr_cnt = 1
            total = (total + curr_sum) % MOD
            
            for i in range(1, n):
                if nums[i] - nums[i - 1] == diff:
                    curr_sum = (curr_sum + nums[i] * (curr_cnt + 1)) % MOD
                    curr_cnt += 1
                else:
                    curr_sum = nums[i]
                    curr_cnt = 1
                total = (total + curr_sum) % MOD
            return total
            
        inc_sum = sum_consecutive(1)
        dec_sum = sum_consecutive(-1)
        single_elements_sum = sum(nums) % MOD
        
        # Single element subarrays were counted in both inc_sum and dec_sum
        return (inc_sum + dec_sum - single_elements_sum) % MOD
