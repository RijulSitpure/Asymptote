class Solution:
    def executeInstructions(self, n: int, startPos: list[int], s: str) -> list[int]:
        m = len(s)
        ans = [0] * m
        moves = {'R': (0, 1), 'L': (0, -1), 'U': (-1, 0), 'D': (1, 0)}

        for i in range(m):
            r, c = startPos
            count = 0
            for j in range(i, m):
                dr, dc = moves[s[j]]
                nr, nc = r + dr, c + dc
                if 0 <= nr < n and 0 <= nc < n:
                    count += 1
                    r, c = nr, nc
                else:
                    break
            ans[i] = count

        return ans
