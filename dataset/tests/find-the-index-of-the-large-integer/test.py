class MockArrayReader:
    def __init__(self, arr):
        self.arr = arr
    def length(self):
        return len(self.arr)
    def compareSub(self, l, r, x, y):
        s1 = sum(self.arr[l:r+1])
        s2 = sum(self.arr[x:y+1])
        if s1 > s2: return 1
        if s1 < s2: return -1
        return 0

class Solution:
    def getIndex(self, reader) -> int:
        l, r = 0, reader.length() - 1
        while l < r:
            length = r - l + 1
            half = length // 2
            if length % 2 == 0:
                cmp = reader.compareSub(l, l + half - 1, l + half, r)
                if cmp >= 0: r = l + half - 1
                else: l = l + half
            else:
                cmp = reader.compareSub(l, l + half - 1, l + half + 1, r)
                if cmp == 0: return l + half
                elif cmp == 1: r = l + half - 1
                else: l = l + half + 1
        return l

sol = Solution()
r1 = MockArrayReader([7,7,7,7,10,7,7,7])
assert sol.getIndex(r1) == 4
r2 = MockArrayReader([6,6,12])
assert sol.getIndex(r2) == 2
print("All tests passed successfully.")
