class Solution:
    def findPattern(self, board: list[list[int]], pattern: list[str]) -> list[int]:
        R, C = len(board), len(board[0])
        pR, pC = len(pattern), len(pattern[0])
        for r in range(R - pR + 1):
            for c in range(C - pC + 1):
                c2d = {}
                d2c = {}
                match = True
                for dr in range(pR):
                    for dc in range(pC):
                        pch = pattern[dr][dc]
                        val = board[r + dr][c + dc]
                        if pch.isdigit():
                            if int(pch) != val:
                                match = False
                                break
                        else:
                            if pch in c2d and c2d[pch] != val:
                                match = False
                                break
                            if val in d2c and d2c[val] != pch:
                                match = False
                                break
                            c2d[pch] = val
                            d2c[val] = pch
                    if not match:
                        break
                if match:
                    return [r, c]
        return [-1, -1]
