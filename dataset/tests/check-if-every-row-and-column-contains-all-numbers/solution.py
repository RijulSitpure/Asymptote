from typing import List

class Solution:
    def checkValid(self, matrix: List[List[int]]) -> bool:
        n = len(matrix)
        for r in range(n):
            if len(set(matrix[r])) != n:
                return False
        for c in range(n):
            if len(set(matrix[r][c] for r in range(n))) != n:
                return False
        return True
