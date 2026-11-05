import math

class Solution:
    def maxScore(self, nums: list[int]) -> int:
        n = len(nums)
        if n == 1:
            return nums[0] * nums[0]
            
        def calc_gcd(a, b):
            return math.gcd(a, b)
            
        def calc_lcm(a, b):
            return (a * b) // math.gcd(a, b)
            
        pref_gcd = [0] * n
        pref_lcm = [0] * n
        suff_gcd = [0] * n
        suff_lcm = [0] * n
        
        pref_gcd[0] = nums[0]
        pref_lcm[0] = nums[0]
        for i in range(1, n):
            pref_gcd[i] = calc_gcd(pref_gcd[i - 1], nums[i])
            pref_lcm[i] = calc_lcm(pref_lcm[i - 1], nums[i])
            
        suff_gcd[-1] = nums[-1]
        suff_lcm[-1] = nums[-1]
        for i in range(n - 2, -1, -1):
            suff_gcd[i] = calc_gcd(suff_gcd[i + 1], nums[i])
            suff_lcm[i] = calc_lcm(suff_lcm[i + 1], nums[i])
            
        best = pref_gcd[-1] * pref_lcm[-1]
        
        for i in range(n):
            if i == 0:
                g = suff_gcd[1]
                l = suff_lcm[1]
            elif i == n - 1:
                g = pref_gcd[n - 2]
                l = pref_lcm[n - 2]
            else:
                g = calc_gcd(pref_gcd[i - 1], suff_gcd[i + 1])
                l = calc_lcm(pref_lcm[i - 1], suff_lcm[i + 1])
            best = max(best, g * l)
            
        return best
