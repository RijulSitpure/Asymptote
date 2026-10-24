from typing import List

class Solution:
    def fixedPoint(self, arr: List[int]) -> int:
        low, high = 0, len(arr) - 1
        ans = -1
        while low <= high:
            mid = (low + high) // 2
            if arr[mid] == mid:
                ans = mid
                high = mid - 1
            elif arr[mid] < mid:
                low = mid + 1
            else:
                high = mid - 1
        return ans

def test():
    sol = Solution()
    assert sol.fixedPoint([-10,-5,0,3,7]) == 3, "test 1 failed"
    assert sol.fixedPoint([0,2,5,8,17]) == 0, "test 2 failed"
    assert sol.fixedPoint([-10,-5,3,4,7,9]) == -1, "test 3 failed"
    print("✓ fixed-point passed")

if __name__ == "__main__":
    test()
