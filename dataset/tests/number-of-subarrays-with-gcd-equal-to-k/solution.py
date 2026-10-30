import math

class Solution:
    def subarrayGCD(self, nums: list[int], k: int) -> int:
        n = len(nums)
        ans = 0
        for i in range(n):
            cur_gcd = 0
            for j in range(i, n):
                cur_gcd = math.gcd(cur_gcd, nums[j])
                if cur_gcd == k:
                    ans += 1
                elif cur_gcd % k != 0:
                    break
        return ans
