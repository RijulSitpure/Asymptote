class SparseVector:
    def __init__(self, nums: list[int]):
        self.pairs = [(i, val) for i, val in enumerate(nums) if val != 0]

    def dotProduct(self, vec: 'SparseVector') -> int:
        p1, p2 = 0, 0
        ans = 0
        while p1 < len(self.pairs) and p2 < len(vec.pairs):
            i1, v1 = self.pairs[p1]
            i2, v2 = vec.pairs[p2]
            if i1 == i2:
                ans += v1 * v2
                p1 += 1
                p2 += 1
            elif i1 < i2:
                p1 += 1
            else:
                p2 += 1
        return ans

v1 = SparseVector([1,0,0,2,3])
v2 = SparseVector([0,3,0,4,0])
assert v1.dotProduct(v2) == 8
v3 = SparseVector([0,1,0,0,0])
v4 = SparseVector([0,0,0,0,0])
assert v3.dotProduct(v4) == 0
print("All tests passed successfully.")
