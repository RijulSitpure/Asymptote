class Solution:
    def canSortArray(self, nums: list[int]) -> bool:
        prev_max = -1
        i = 0
        n = len(nums)
        while i < n:
            cnt = nums[i].bit_count()
            cur_min = nums[i]
            cur_max = nums[i]
            j = i + 1
            while j < n and nums[j].bit_count() == cnt:
                cur_min = min(cur_min, nums[j])
                cur_max = max(cur_max, nums[j])
                j += 1
            if prev_max > cur_min:
                return False
            prev_max = cur_max
            i = j
        return True
