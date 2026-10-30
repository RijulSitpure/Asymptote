import math

class Solution:
    def subarrayLCM(self, nums: list[int], k: int) -> int:
        n = len(nums)
        ans = 0
        for i in range(n):
            cur = nums[i]
            for j in range(i, n):
                cur = math.lcm(cur, nums[j])
                if cur == k:
                    ans += 1
                elif cur > k:
                    break
        return ans
