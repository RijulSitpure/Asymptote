from typing import List

class Solution:
    def longestSemiRepeatingSubarray(self, nums: List[int]) -> int:
        n = len(nums)
        if n <= 2:
            return n
        left = 0
        repeat_count = 0
        max_len = 1
        for right in range(1, n):
            if nums[right] == nums[right - 1]:
                repeat_count += 1
            while repeat_count > 1:
                if nums[left + 1] == nums[left]:
                    repeat_count -= 1
                left += 1
            max_len = max(max_len, right - left + 1)
        return max_len

def run_tests():
    sol = Solution()
    assert sol.longestSemiRepeatingSubarray([5, 2, 2, 3, 3, 6]) == 4
    assert sol.longestSemiRepeatingSubarray([5, 4, 9]) == 3
    assert sol.longestSemiRepeatingSubarray([1, 1, 1, 1]) == 2
    print("All tests passed for 3641.")

if __name__ == "__main__":
    run_tests()
