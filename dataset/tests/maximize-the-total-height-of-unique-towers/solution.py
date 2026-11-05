class Solution:
    def maximumTotalSum(self, maximumHeight: list[int]) -> int:
        maximumHeight.sort(reverse=True)
        curr = float('inf')
        total = 0
        for h in maximumHeight:
            assigned = min(curr - 1, h)
            if assigned <= 0:
                return -1
            total += assigned
            curr = assigned
        return total
