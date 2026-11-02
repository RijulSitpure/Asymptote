from collections import deque

class Solution:
    def continuousSubarrays(self, nums: list[int]) -> int:
        min_dq = deque()
        max_dq = deque()
        l = 0
        ans = 0
        for r, x in enumerate(nums):
            while min_dq and nums[min_dq[-1]] >= x:
                min_dq.pop()
            min_dq.append(r)
            while max_dq and nums[max_dq[-1]] <= x:
                max_dq.pop()
            max_dq.append(r)
            while nums[max_dq[0]] - nums[min_dq[0]] > 2:
                l += 1
                if min_dq[0] < l:
                    min_dq.popleft()
                if max_dq[0] < l:
                    max_dq.popleft()
            ans += (r - l + 1)
        return ans
