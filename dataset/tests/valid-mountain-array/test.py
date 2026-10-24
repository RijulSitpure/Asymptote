from typing import List

class Solution:
    def validMountainArray(self, arr: List[int]) -> bool:
        n = len(arr)
        left, right = 0, n - 1
        while left + 1 < n and arr[left] < arr[left + 1]:
            left += 1
        while right > 0 and arr[right] < arr[right - 1]:
            right -= 1
        return 0 < left == right < n - 1

def test():
    sol = Solution()
    assert sol.validMountainArray([2,1]) is False, "test 1 failed"
    assert sol.validMountainArray([3,5,5]) is False, "test 2 failed"
    assert sol.validMountainArray([0,3,2,1]) is True, "test 3 failed"
    print("✓ valid-mountain-array passed")

if __name__ == "__main__":
    test()
