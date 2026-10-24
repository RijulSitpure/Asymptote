from typing import List

class Solution:
    def sortArrayByParity(self, nums: List[int]) -> List[int]:
        lo, hi = 0, len(nums) - 1
        while lo < hi:
            if nums[lo] % 2 > nums[hi] % 2:
                nums[lo], nums[hi] = nums[hi], nums[lo]
            if nums[lo] % 2 == 0:
                lo += 1
            if nums[hi] % 2 == 1:
                hi -= 1
        return nums

def test():
    sol = Solution()
    res1 = sol.sortArrayByParity([3, 1, 2, 4])
    assert res1[:2] == [4, 2] or res1[:2] == [2, 4]
    assert res1[2:] == [1, 3] or res1[2:] == [3, 1]
    res2 = sol.sortArrayByParity([0])
    assert res2 == [0]
    print("✓ sort-array-by-parity passed")

if __name__ == "__main__":
    test()
