class Solution:
    def minCost(self, startPos: list[int], homePos: list[int], rowCosts: list[int], colCosts: list[int]) -> int:
        cost = 0
        r_step = 1 if homePos[0] >= startPos[0] else -1
        c_step = 1 if homePos[1] >= startPos[1] else -1

        r = startPos[0]
        while r != homePos[0]:
            r += r_step
            cost += rowCosts[r]

        c = startPos[1]
        while c != homePos[1]:
            c += c_step
            cost += colCosts[c]

        return cost
