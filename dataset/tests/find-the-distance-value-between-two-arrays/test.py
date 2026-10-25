import bisect

class Solution:
    def findTheDistanceValue(self, arr1: list[int], arr2: list[int], d: int) -> int:
        arr2.sort()
        count = 0
        for x in arr1:
            idx = bisect.bisect_left(arr2, x)
            valid = True
            if idx < len(arr2) and abs(arr2[idx] - x) <= d:
                valid = False
            if idx > 0 and abs(arr2[idx - 1] - x) <= d:
                valid = False
            if valid:
                count += 1
        return count

def test():
    sol = Solution()
    assert sol.findTheDistanceValue([4,5,8], [10,9,1,8], 2) == 2, "test 1 failed"
    assert sol.findTheDistanceValue([1,4,2,3], [-4,-3,6,10,20,30], 3) == 2, "test 2 failed"
    assert sol.findTheDistanceValue([2,1,100,3], [-5,-2,10,-3,7], 6) == 1, "test 3 failed"
    print("✓ find-the-distance-value-between-two-arrays passed")

if __name__ == "__main__":
    test()
