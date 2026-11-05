class Solution:
    def countValidSelections(self, nums: list[int]) -> int:
        total = sum(nums)
        left_sum = 0
        ans = 0
        
        for x in nums:
            if x == 0:
                right_sum = total - left_sum
                diff = abs(left_sum - right_sum)
                if diff == 0:
                    ans += 2
                elif diff == 1:
                    ans += 1
            else:
                left_sum += x
                
        return ans
