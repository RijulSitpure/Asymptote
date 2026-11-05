from typing import List

class Solution:
    def sortByAbsoluteValue(self, nums: List[int]) -> List[int]:
        return sorted(nums, key=lambda x: abs(x))

def run_tests():
    sol = Solution()
    assert sol.sortByAbsoluteValue([3, -1, -5, 2]) == [-1, 2, 3, -5]
    assert sol.sortByAbsoluteValue([-10, 0, 10]) == [0, -10, 10]
    print("All tests passed for 3667.")

if __name__ == "__main__":
    run_tests()
