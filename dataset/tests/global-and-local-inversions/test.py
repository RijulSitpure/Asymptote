from typing import List

class Solution:
    def isIdealPermutation(self, nums: List[int]) -> bool:
        for i, val in enumerate(nums):
            if abs(val - i) > 1:
                return False
        return True

def test():
    sol = Solution()
    assert sol.isIdealPermutation([1, 0, 2]) is True, "test 1 failed"
    assert sol.isIdealPermutation([1, 2, 0]) is False, "test 2 failed"
    print("✓ global-and-local-inversions passed")

if __name__ == "__main__":
    test()
