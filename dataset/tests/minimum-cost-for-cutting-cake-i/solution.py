class Solution:
    def minimumCost(self, m: int, n: int, horizontalCut: list[int], verticalCut: list[int]) -> int:
        horizontalCut.sort(reverse=True)
        verticalCut.sort(reverse=True)
        h, v = 0, 0
        h_pieces, v_pieces = 1, 1
        total_cost = 0
        while h < len(horizontalCut) and v < len(verticalCut):
            if horizontalCut[h] >= verticalCut[v]:
                total_cost += horizontalCut[h] * v_pieces
                h_pieces += 1
                h += 1
            else:
                total_cost += verticalCut[v] * h_pieces
                v_pieces += 1
                v += 1
        while h < len(horizontalCut):
            total_cost += horizontalCut[h] * v_pieces
            h += 1
        while v < len(verticalCut):
            total_cost += verticalCut[v] * h_pieces
            v += 1
        return total_cost
