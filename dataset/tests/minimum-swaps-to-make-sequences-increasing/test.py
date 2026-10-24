from typing import List

class Solution:
    def minSwap(self, nums1: List[int], nums2: List[int]) -> int:
        n = len(nums1)
        keep = 0
        swap = 1

        for i in range(1, n):
            new_keep = float('inf')
            new_swap = float('inf')

            if nums1[i] > nums1[i - 1] and nums2[i] > nums2[i - 1]:
                new_keep = min(new_keep, keep)
                new_swap = min(new_swap, swap + 1)

            if nums1[i] > nums2[i - 1] and nums2[i] > nums1[i - 1]:
                new_keep = min(new_keep, swap)
                new_swap = min(new_swap, keep + 1)

            keep, swap = new_keep, new_swap

        return min(keep, swap)

def test():
    sol = Solution()
    assert sol.minSwap([1, 3, 5, 4], [1, 2, 3, 7]) == 1, "test 1 failed"
    assert sol.minSwap([0, 3, 5, 8, 9], [2, 1, 4, 6, 9]) == 1, "test 2 failed"
    print("✓ minimum-swaps-to-make-sequences-increasing passed")

if __name__ == "__main__":
    test()
