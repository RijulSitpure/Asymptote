from typing import List
from collections import deque

class Solution:
    def shortestPathAllKeys(self, grid: List[str]) -> int:
        m, n = len(grid), len(grid[0])
        start_r = start_c = 0
        total_keys = 0
        for i in range(m):
            for j in range(n):
                ch = grid[i][j]
                if ch == '@':
                    start_r, start_c = i, j
                elif 'a' <= ch <= 'f':
                    total_keys = max(total_keys, ord(ch) - ord('a') + 1)

        target_mask = (1 << total_keys) - 1
        q = deque([(start_r, start_c, 0, 0)])
        visited = {(start_r, start_c, 0)}

        while q:
            r, c, mask, dist = q.popleft()
            if mask == target_mask:
                return dist
            for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                nr, nc = r + dr, c + dc
                if 0 <= nr < m and 0 <= nc < n:
                    ch = grid[nr][nc]
                    if ch == '#':
                        continue
                    if 'A' <= ch <= 'F' and not (mask & (1 << (ord(ch) - ord('A')))):
                        continue
                    nmask = mask
                    if 'a' <= ch <= 'f':
                        nmask |= (1 << (ord(ch) - ord('a')))
                    state = (nr, nc, nmask)
                    if state not in visited:
                        visited.add(state)
                        q.append((nr, nc, nmask, dist + 1))
        return -1

def test():
    sol = Solution()
    assert sol.shortestPathAllKeys(["@.a..", "###.#", "b.A.B"]) == 8, "test 1 failed"
    assert sol.shortestPathAllKeys(["@..aA", "..B#.", "....b"]) == 6, "test 2 failed"
    assert sol.shortestPathAllKeys(["@Aa"]) == -1, "test 3 failed"
    print("✓ shortest-path-to-get-all-keys passed")

if __name__ == "__main__":
    test()
