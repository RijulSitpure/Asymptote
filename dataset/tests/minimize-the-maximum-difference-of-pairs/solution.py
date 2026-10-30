class Solution:
    def minimizeMax(self, nums: list[int], p: int) -> int:
        nums.sort()
        def count_pairs(d):
            cnt = 0
            i = 0
            while i < len(nums) - 1:
                if nums[i + 1] - nums[i] <= d:
                    cnt += 1
                    i += 2
                else:
                    i += 1
            return cnt
        low = 0
        high = nums[-1] - nums[0]
        while low < high:
            mid = (low + high) // 2
            if count_pairs(mid) >= p:
                high = mid
            else:
                low = mid + 1
        return low
