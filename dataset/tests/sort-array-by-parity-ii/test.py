from typing import List

class Solution:
    def sortArrayByParityII(self, nums: List[int]) -> List[int]:
        n = len(nums)
        even, odd = 0, 1
        while even < n and odd < n:
            if nums[even] % 2 == 0:
                even += 2
            elif nums[odd] % 2 == 1:
                odd += 2
            else:
                nums[even], nums[odd] = nums[odd], nums[even]
                even += 2
                odd += 2
        return nums

def test():
    sol = Solution()
    res1 = sol.sortArrayByParityII([4, 2, 5, 7])
    for i in range(len(res1)):
        assert res1[i] % 2 == i % 2, f"Parity mismatch at index {i}"
    res2 = sol.sortArrayByParityII([2, 3])
    assert res2 == [2, 3]
    print("✓ sort-array-by-parity-ii passed")

if __name__ == "__main__":
    test()
