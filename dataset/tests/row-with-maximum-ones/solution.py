class Solution:
    def rowAndMaximumOnes(self, mat: list[list[int]]) -> list[int]:
        best_idx = 0
        max_ones = -1
        for i, row in enumerate(mat):
            c = row.count(1)
            if c > max_ones:
                max_ones = c
                best_idx = i
        return [best_idx, max_ones]
