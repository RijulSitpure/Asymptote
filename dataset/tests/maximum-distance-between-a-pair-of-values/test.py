class Solution:
    def maxDistance(self, nums1: list[int], nums2: list[int]) -> int:
        i, j = 0, 0
        ans = 0
        n, m = len(nums1), len(nums2)
        while i < n and j < m:
            if nums1[i] <= nums2[j]:
                ans = max(ans, j - i)
                j += 1
            else:
                i += 1
        return ans

def test():
    sol = Solution()
    assert sol.maxDistance([55,30,5,4,2], [100,20,10,10,5]) == 2
    assert sol.maxDistance([2,2,2], [10,10,1]) == 1
    assert sol.maxDistance([30,29,19,5], [25,25,25,25,25]) == 2

if __name__ == '__main__':
    test()
