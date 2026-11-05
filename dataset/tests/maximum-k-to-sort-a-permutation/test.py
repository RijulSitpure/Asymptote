from typing import List

class Solution:
    def maxKToSort(self, nums: List[int]) -> int:
        displaced = [val for i, val in enumerate(nums) if val != i]
        if not displaced:
            return 0
        mask = displaced[0]
        for val in displaced[1:]:
            mask &= val
        return mask

def run_tests():
    sol = Solution()
    assert sol.maxKToSort([0, 3, 2, 1]) == 1
    assert sol.maxKToSort([0, 1, 2, 3]) == 0
    assert sol.maxKToSort([3, 2, 1, 0]) == 0
    print("All tests passed for 3644.")

if __name__ == "__main__":
    run_tests()
