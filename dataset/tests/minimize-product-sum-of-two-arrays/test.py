class Solution:
    def minProductSum(self, nums1: list[int], nums2: list[int]) -> int:
        nums1.sort()
        nums2.sort(reverse=True)
        return sum(a * b for a, b in zip(nums1, nums2))

def test():
    sol = Solution()
    assert sol.minProductSum([5,3,4,2], [4,2,2,5]) == 40
    assert sol.minProductSum([2,1,4,5,7], [3,2,4,8,6]) == 65

if __name__ == '__main__':
    test()
