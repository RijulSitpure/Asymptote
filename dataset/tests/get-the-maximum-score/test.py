class Solution:
    def maxSum(self, nums1: list[int], nums2: list[int]) -> int:
        MOD = 10**9 + 7
        i, j = 0, 0
        sum1, sum2 = 0, 0
        n, m = len(nums1), len(nums2)
        while i < n and j < m:
            if nums1[i] < nums2[j]:
                sum1 += nums1[i]
                i += 1
            elif nums2[j] < nums1[i]:
                sum2 += nums2[j]
                j += 1
            else:
                common = max(sum1, sum2) + nums1[i]
                sum1 = sum2 = common
                i += 1
                j += 1
        while i < n:
            sum1 += nums1[i]
            i += 1
        while j < m:
            sum2 += nums2[j]
            j += 1
        return max(sum1, sum2) % MOD

def test():
    sol = Solution()
    assert sol.maxSum([2,4,5,8,10], [4,6,8,9]) == 30, "test 1 failed"
    assert sol.maxSum([1,3,5,7,9], [3,5,100]) == 109, "test 2 failed"
    assert sol.maxSum([1,2,3,4,5], [6,7,8,9,10]) == 40, "test 3 failed"
    print("✓ get-the-maximum-score passed")

if __name__ == "__main__":
    test()
