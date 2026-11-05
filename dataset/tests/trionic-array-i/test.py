from typing import List

class Solution:
    def isTrionic(self, nums: List[int]) -> bool:
        n = len(nums)
        if n < 4:
            return False
        i = 0
        while i + 1 < n and nums[i] < nums[i + 1]:
            i += 1
        if i == 0 or i >= n - 2:
            return False
        p = i
        while i + 1 < n and nums[i] > nums[i + 1]:
            i += 1
        if i == p or i >= n - 1:
            return False
        while i + 1 < n and nums[i] < nums[i + 1]:
            i += 1
        return i == n - 1

def run_tests():
    sol = Solution()
    assert sol.isTrionic([1, 3, 5, 4, 2, 6, 8]) == True
    assert sol.isTrionic([1, 2, 3, 4]) == False
    assert sol.isTrionic([5, 4, 3, 2, 1]) == False
    assert sol.isTrionic([1, 4, 2, 5]) == True
    print("All tests passed for 3637.")

if __name__ == "__main__":
    run_tests()
