class MockBinaryMatrix:
    def __init__(self, mat):
        self.mat = mat
    def dimensions(self):
        return [len(self.mat), len(self.mat[0])]
    def get(self, r, c):
        return self.mat[r][c]

class Solution:
    def leftMostColumnWithOne(self, binaryMatrix) -> int:
        rows, cols = binaryMatrix.dimensions()
        r, c = 0, cols - 1
        ans = -1
        while r < rows and c >= 0:
            if binaryMatrix.get(r, c) == 1:
                ans = c
                c -= 1
            else:
                r += 1
        return ans

sol = Solution()
m1 = MockBinaryMatrix([[0,0],[1,1]])
assert sol.leftMostColumnWithOne(m1) == 0
m2 = MockBinaryMatrix([[0,0],[0,1]])
assert sol.leftMostColumnWithOne(m2) == 1
m3 = MockBinaryMatrix([[0,0],[0,0]])
assert sol.leftMostColumnWithOne(m3) == -1
print("All tests passed successfully.")
