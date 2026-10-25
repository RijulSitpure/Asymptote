class Solution:
    def findLengthOfShortestSubarray(self, arr: list[int]) -> int:
        n = len(arr)
        left = 0
        while left + 1 < n and arr[left] <= arr[left + 1]:
            left += 1
        if left == n - 1:
            return 0
        right = n - 1
        while right > 0 and arr[right - 1] <= arr[right]:
            right -= 1
        ans = min(n - 1 - left, right)
        i, j = 0, right
        while i <= left and j < n:
            if arr[i] <= arr[j]:
                ans = min(ans, j - i - 1)
                i += 1
            else:
                j += 1
        return ans

def test():
    sol = Solution()
    assert sol.findLengthOfShortestSubarray([1,2,3,10,4,2,3,5]) == 3, "test 1 failed"
    assert sol.findLengthOfShortestSubarray([5,4,3,2,1]) == 4, "test 2 failed"
    assert sol.findLengthOfShortestSubarray([1,2,3]) == 0, "test 3 failed"
    print("✓ shortest-subarray-to-be-removed-to-make-array-sorted passed")

if __name__ == "__main__":
    test()
