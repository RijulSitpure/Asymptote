class Solution:
    def kthCharacter(self, k: int, operations: list[int]) -> str:
        idx = k - 1
        shifts = 0
        for i, op in enumerate(operations):
            if (idx >> i) & 1:
                shifts += op
        return chr(ord('a') + (shifts % 26))
