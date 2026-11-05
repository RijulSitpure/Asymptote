class Solution:
    def maxSplitScore(self, nums: list[int]) -> int:
        total_sum = sum(nums)
        left_sum = 0
        max_score = float('-inf')
        
        for i in range(len(nums) - 1):
            left_sum += nums[i]
            right_sum = total_sum - left_sum
            max_score = max(max_score, left_sum - right_sum)
        
        return max_score

def run_tests():
    sol = Solution()
    assert sol.maxSplitScore([10, -5, 2]) == 13 # split after index 0: 10 - (-5 + 2) = 10 - (-3) = 13
    assert sol.maxSplitScore([1, 2, 3, 4]) == 2
    print("All tests passed for 3788.")

if __name__ == "__main__":
    run_tests()
