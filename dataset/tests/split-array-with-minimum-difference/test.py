class Solution:
    def splitArrayWithMinimumDifference(self, nums: list[int]) -> int:
        total_sum = sum(nums)
        prefix = 0
        min_diff = float('inf')
        for i in range(len(nums) - 1):
            prefix += nums[i]
            suffix = total_sum - prefix
            min_diff = min(min_diff, abs(prefix - suffix))
        return min_diff

def run_tests():
    sol = Solution()
    assert sol.splitArrayWithMinimumDifference([3, 1, 2, 4, 3]) == 1 # split after index 2: [3,1,2]=6, [4,3]=7 -> diff 1
    assert sol.splitArrayWithMinimumDifference([1, 10, 1]) == 10 # [1]=1, [10,1]=11 -> diff 10; [1,10]=11, [1]=1 -> diff 10
    assert sol.splitArrayWithMinimumDifference([5, 5]) == 0
    print("All tests passed for 3698.")

if __name__ == "__main__":
    run_tests()