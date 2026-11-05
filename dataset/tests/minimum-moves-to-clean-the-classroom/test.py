from typing import List
from collections import deque

class Solution:
    def minMoves(self, classroom: List[str], energy: int) -> int:
        m, n = len(classroom), len(classroom[0])
        litter = []
        sr, sc = 0, 0
        for r in range(m):
            for c in range(n):
                if classroom[r][c] == "S":
                    sr, sc = r, c
                elif classroom[r][c] == "L":
                    litter.append((r, c))

        k = len(litter)
        l_map = {pos: i for i, pos in enumerate(litter)}
        init_mask = (1 << k) - 1

        q = deque([(sr, sc, energy, init_mask)])
        visited = {(sr, sc, energy, init_mask)}
        moves = 0
        dirs = [(-1, 0), (1, 0), (0, -1), (0, 1)]

        while q:
            for _ in range(len(q)):
                r, c, ce, mask = q.popleft()
                if mask == 0:
                    return moves
                if ce == 0:
                    continue
                for dr, dc in dirs:
                    nr, nc = r + dr, c + dc
                    if 0 <= nr < m and 0 <= nc < n and classroom[nr][nc] != "X":
                        ne = energy if classroom[nr][nc] == "R" else ce - 1
                        nm = mask
                        if classroom[nr][nc] == "L" and (nr, nc) in l_map:
                            nm &= ~(1 << l_map[(nr, nc)])
                        st = (nr, nc, ne, nm)
                        if st not in visited:
                            visited.add(st)
                            q.append(st)
            moves += 1

        return -1

def run_tests():
    s = Solution()
    res = s.minMoves(["S.L", "...", "..R"], 5)
    assert res == 2, f"Expected 2, got {res}"
    print("3568 minimum-moves-to-clean-the-classroom PASSED")

if __name__ == "__main__":
    run_tests()
