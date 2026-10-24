from typing import List

class Solution:
    def advantageCount(self, nums1: List[int], nums2: List[int]) -> List[int]:
        nums1.sort()
        order = sorted(range(len(nums2)), key=lambda i: nums2[i])
        ans = [0] * len(nums1)
        lo, hi = 0, len(nums2) - 1
        for x in nums1:
            if x > nums2[order[lo]]:
                ans[order[lo]] = x
                lo += 1
            else:
                ans[order[hi]] = x
                hi -= 1
        return ans

def test():
    sol = Solution()
    res1 = sol.advantageCount([2, 7, 11, 15], [1, 10, 4, 11])
    assert res1 == [2, 11, 7, 15], f"test 1 failed: {res1}"
    res2 = sol.advantageCount([12, 24, 8, 32], [13, 25, 32, 11])
    assert res2 == [24, 32, 8, 12], f"test 2 failed: {res2}"
    print("✓ advantage-shuffle passed")

if __name__ == "__main__":
    test()
