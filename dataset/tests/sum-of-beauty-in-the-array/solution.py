class Solution:
    def sumOfBeauties(self, nums: list[int]) -> int:
        n = len(nums)
        pref_max = [0] * n
        pref_max[0] = nums[0]
        for i in range(1, n):
            pref_max[i] = max(pref_max[i - 1], nums[i])
            
        suff_min = [0] * n
        suff_min[-1] = nums[-1]
        for i in range(n - 2, -1, -1):
            suff_min[i] = min(suff_min[i + 1], nums[i])
            
        beauty = 0
        for i in range(1, n - 1):
            if pref_max[i - 1] < nums[i] < suff_min[i + 1]:
                beauty += 2
            elif nums[i - 1] < nums[i] < nums[i + 1]:
                beauty += 1
        return beauty
