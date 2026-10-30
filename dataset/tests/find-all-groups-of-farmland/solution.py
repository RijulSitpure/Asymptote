class Solution:
    def findFarmland(self, land: list[list[int]]) -> list[list[int]]:
        m, n = len(land), len(land[0])
        ans = []
        for r in range(m):
            for c in range(n):
                if land[r][c] == 1:
                    if (r == 0 or land[r - 1][c] == 0) and (c == 0 or land[r][c - 1] == 0):
                        r2, c2 = r, c
                        while r2 + 1 < m and land[r2 + 1][c] == 1:
                            r2 += 1
                        while c2 + 1 < n and land[r][c2 + 1] == 1:
                            c2 += 1
                        ans.append([r, c, r2, c2])
        return ans
