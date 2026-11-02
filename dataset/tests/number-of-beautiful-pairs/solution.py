import math

class Solution:
    def countBeautifulPairs(self, nums: list[int]) -> int:
        n = len(nums)
        ans = 0
        for i in range(n):
            first_digit = int(str(nums[i])[0])
            for j in range(i + 1, n):
                last_digit = nums[j] % 10
                if math.gcd(first_digit, last_digit) == 1:
                    ans += 1
        return ans
