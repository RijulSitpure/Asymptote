class MockMountain:
    def __init__(self, arr):
        self.arr = arr
    def get(self, index: int) -> int:
        return self.arr[index]
    def length(self) -> int:
        return len(self.arr)

class Solution:
    def findInMountainArray(self, target: int, mountainArr) -> int:
        n = mountainArr.length()
        l, r = 0, n - 1
        while l < r:
            m = (l + r) // 2
            if mountainArr.get(m) < mountainArr.get(m + 1):
                l = m + 1
            else:
                r = m
        peak = l

        l, r = 0, peak
        while l <= r:
            m = (l + r) // 2
            val = mountainArr.get(m)
            if val == target:
                return m
            elif val < target:
                l = m + 1
            else:
                r = m - 1

        l, r = peak + 1, n - 1
        while l <= r:
            m = (l + r) // 2
            val = mountainArr.get(m)
            if val == target:
                return m
            elif val > target:
                l = m + 1
            else:
                r = m - 1

        return -1

sol = Solution()
m1 = MockMountain([1, 2, 3, 4, 5, 3, 1])
assert sol.findInMountainArray(3, m1) == 2
m2 = MockMountain([0, 1, 2, 4, 2, 1])
assert sol.findInMountainArray(3, m2) == -1
print("All tests passed successfully.")
