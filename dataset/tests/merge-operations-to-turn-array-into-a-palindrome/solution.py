class Solution:
    def minimumOperations(self, nums: list[int]) -> int:
        left = 0
        right = len(nums) - 1
        l_val = nums[left]
        r_val = nums[right]
        ops = 0
        
        while left < right:
            if l_val == r_val:
                left += 1
                right -= 1
                l_val = nums[left]
                r_val = nums[right]
            elif l_val < r_val:
                left += 1
                l_val += nums[left]
                ops += 1
            else:
                right -= 1
                r_val += nums[right]
                ops += 1
        return ops
