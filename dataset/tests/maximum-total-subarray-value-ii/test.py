from typing import List

class Solution:
    def maxSubarrayValue(self, nums: List[int], k: int) -> int:
        if len(nums) < k:
            return 0
        return max(nums) - min(nums)

def run_tests():
    sol = Solution()
    assert sol.maxSubarrayValue([1, 4, 2, 5], 2) == 4
    assert sol.maxSubarrayValue([10], 1) == 0
    print("All tests passed for 3691.")

if __name__ == "__main__":
    run_tests()
