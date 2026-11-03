class Solution:
    def maxFrequencyScore(self, nums: list[int], k: int) -> int:
        nums.sort()
        n = len(nums)
        pref = [0] * (n + 1)
        for i in range(n):
            pref[i + 1] = pref[i] + nums[i]
            
        def cost(left: int, right: int) -> int:
            mid = (left + right) // 2
            med = nums[mid]
            left_cost = med * (mid - left + 1) - (pref[mid + 1] - pref[left])
            right_cost = (pref[right + 1] - pref[mid + 1]) - med * (right - mid)
            return left_cost + right_cost
            
        ans = 0
        left = 0
        for right in range(n):
            while cost(left, right) > k:
                left += 1
            ans = max(ans, right - left + 1)
        return ans
