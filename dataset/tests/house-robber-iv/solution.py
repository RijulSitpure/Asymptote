class Solution:
    def minCapability(self, nums: list[int], k: int) -> int:
        lo, hi = min(nums), max(nums)
        while lo < hi:
            mid = (lo + hi) // 2
            cnt = 0
            i = 0
            while i < len(nums):
                if nums[i] <= mid:
                    cnt += 1
                    i += 2
                else:
                    i += 1
            if cnt >= k:
                hi = mid
            else:
                lo = mid + 1
        return lo
