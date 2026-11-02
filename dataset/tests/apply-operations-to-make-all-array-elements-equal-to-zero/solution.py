class Solution:
    def checkArray(self, nums: list[int], k: int) -> bool:
        n = len(nums)
        curr_dec = 0
        diff = [0] * (n + 1)
        for i in range(n):
            curr_dec += diff[i]
            val = nums[i] - curr_dec
            if val < 0:
                return False
            if val > 0:
                if i + k > n:
                    return False
                curr_dec += val
                diff[i + k] -= val
        return True