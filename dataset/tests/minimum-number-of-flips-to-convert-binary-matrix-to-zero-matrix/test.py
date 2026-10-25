from collections import deque

class Solution:
    def minFlips(self, mat: list[list[int]]) -> int:
        m, n = len(mat), len(mat[0])
        start = 0
        for r in range(m):
            for c in range(n):
                if mat[r][c]:
                    start |= 1 << (r * n + c)
        if start == 0:
            return 0
        q = deque([(start, 0)])
        seen = {start}
        while q:
            state, steps = q.popleft()
            for r in range(m):
                for c in range(n):
                    nxt = state
                    for dr, dc in [(0, 0), (1, 0), (-1, 0), (0, 1), (0, -1)]:
                        nr, nc = r + dr, c + dc
                        if 0 <= nr < m and 0 <= nc < n:
                            nxt ^= 1 << (nr * n + nc)
                    if nxt == 0:
                        return steps + 1
                    if nxt not in seen:
                        seen.add(nxt)
                        q.append((nxt, steps + 1))
        return -1

def test():
    sol = Solution()
    assert sol.minFlips([[0,0],[0,1]]) == 3, "test 1 failed"
    assert sol.minFlips([[0]]) == 0, "test 2 failed"
    assert sol.minFlips([[1,0,0],[1,0,0]]) == -1, "test 3 failed"
    print("✓ minimum-number-of-flips-to-convert-binary-matrix-to-zero-matrix passed")

if __name__ == "__main__":
    test()
