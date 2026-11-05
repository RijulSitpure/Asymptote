class Solution:
    def minZeroArray(self, nums: list[int], queries: list[list[int]]) -> int:
        n = len(nums)
        if all(x == 0 for x in nums):
            return 0
            
        def check(k):
            diff = [0] * (n + 1)
            for i in range(k):
                l, r, val = queries[i]
                diff[l] += val
                diff[r + 1] -= val
            curr = 0
            for i in range(n):
                curr += diff[i]
                if nums[i] > curr:
                    return False
            return True
            
        low, high = 1, len(queries)
        ans = -1
        while low <= high:
            mid = (low + high) // 2
            if check(mid):
                ans = mid
                high = mid - 1
            else:
                low = mid + 1
                
        return ans
