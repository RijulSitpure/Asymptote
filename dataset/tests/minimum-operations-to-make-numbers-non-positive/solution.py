class Solution:
    def minOperations(self, nums: list[int], x: int, y: int) -> int:
        import math
        diff = x - y
        low = 1
        high = max(nums)
        while low < high:
            mid = (low + high) // 2
            boosts_needed = 0
            for num in nums:
                rem = num - mid * y
                if rem > 0:
                    boosts_needed += math.ceil(rem / diff)
            if boosts_needed <= mid:
                high = mid
            else:
                low = mid + 1
        return low
