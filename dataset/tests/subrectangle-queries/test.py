class SubrectangleQueries:
    def __init__(self, rectangle: list[list[int]]):
        self.rect = rectangle
        self.ops = []

    def updateSubrectangle(self, row1: int, col1: int, row2: int, col2: int, newValue: int) -> None:
        self.ops.append((row1, col1, row2, col2, newValue))

    def getValue(self, row: int, col: int) -> int:
        for r1, c1, r2, c2, val in reversed(self.ops):
            if r1 <= row <= r2 and c1 <= col <= c2:
                return val
        return self.rect[row][col]

sq = SubrectangleQueries([[1,2,1],[4,3,4],[3,2,1],[1,1,1]])
assert sq.getValue(0, 2) == 1
sq.updateSubrectangle(0, 0, 3, 2, 5)
assert sq.getValue(0, 2) == 5
assert sq.getValue(3, 1) == 5
sq.updateSubrectangle(3, 0, 3, 2, 10)
assert sq.getValue(3, 1) == 10
assert sq.getValue(0, 2) == 5
print("All tests passed successfully.")
