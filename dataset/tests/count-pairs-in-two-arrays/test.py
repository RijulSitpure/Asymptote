class Solution:
    def countPairs(self, nums1: list[int], nums2: list[int]) -> int:
        diff = sorted(a - b for a, b in zip(nums1, nums2))
        left, right = 0, len(diff) - 1
        ans = 0

        while left < right:
            if diff[left] + diff[right] > 0:
                ans += right - left
                right -= 1
            else:
                left += 1

        return ans

def test():
    sol = Solution()
    assert sol.countPairs([2,1,2,1], [1,2,1,2]) == 1
    assert sol.countPairs([1,10,6,2], [1,4,1,5]) == 5

if __name__ == '__main__':
    test()
