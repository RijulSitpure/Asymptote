from typing import List

class Solution:
    def peakIndexInMountainArray(self, arr: List[int]) -> int:
        low, high = 0, len(arr) - 1
        while low < high:
            mid = (low + high) // 2
            if arr[mid] < arr[mid + 1]:
                low = mid + 1
            else:
                high = mid
        return low

def test():
    sol = Solution()
    assert sol.peakIndexInMountainArray([0, 1, 0]) == 1, "test 1 failed"
    assert sol.peakIndexInMountainArray([0, 2, 1, 0]) == 1, "test 2 failed"
    assert sol.peakIndexInMountainArray([0, 10, 5, 2]) == 1, "test 3 failed"
    print("✓ peak-index-in-a-mountain-array passed")

if __name__ == "__main__":
    test()
