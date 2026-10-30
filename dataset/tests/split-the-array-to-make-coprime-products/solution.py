class Solution:
    def findValidSplit(self, nums: list[int]) -> int:
        n = len(nums)
        last_idx = {}
        for i, x in enumerate(nums):
            d = 2
            while d * d <= x:
                if x % d == 0:
                    last_idx[d] = i
                    while x % d == 0:
                        x //= d
                d += 1
            if x > 1:
                last_idx[x] = i
        max_reach = 0
        for i in range(n - 1):
            x = nums[i]
            d = 2
            while d * d <= x:
                if x % d == 0:
                    max_reach = max(max_reach, last_idx[d])
                    while x % d == 0:
                        x //= d
                d += 1
            if x > 1:
                max_reach = max(max_reach, last_idx[x])
            if max_reach <= i:
                return i
        return -1
