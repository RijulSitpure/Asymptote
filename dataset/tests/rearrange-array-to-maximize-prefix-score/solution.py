class Solution:
    def maxScore(self, nums: list[int]) -> int:
        nums.sort(reverse=True)
        running = 0
        ans = 0
        for x in nums:
            running += x
            if running > 0:
                ans += 1
            else:
                break
        return ans
