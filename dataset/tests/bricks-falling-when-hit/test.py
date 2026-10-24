from typing import List

class Solution:
    def hitBricks(self, grid: List[List[int]], hits: List[List[int]]) -> List[int]:
        R, C = len(grid), len(grid[0])
        g = [row[:] for row in grid]
        for r, c in hits:
            g[r][c] -= 1

        parent = list(range(R * C + 1))
        sz = [1] * (R * C + 1)
        roof = R * C

        def find(x: int) -> int:
            while parent[x] != x:
                parent[x] = parent[parent[x]]
                x = parent[x]
            return x

        def union(x: int, y: int) -> None:
            rx, ry = find(x), find(y)
            if rx != ry:
                parent[rx] = ry
                sz[ry] += sz[rx]

        for c in range(C):
            if g[0][c] == 1:
                union(c, roof)

        for r in range(R):
            for c in range(C):
                if g[r][c] == 1:
                    idx = r * C + c
                    if r + 1 < R and g[r + 1][c] == 1:
                        union(idx, (r + 1) * C + c)
                    if c + 1 < C and g[r][c + 1] == 1:
                        union(idx, r * C + c + 1)

        ans = []
        for r, c in reversed(hits):
            g[r][c] += 1
            if g[r][c] != 1:
                ans.append(0)
                continue
            prev = sz[find(roof)]
            idx = r * C + c
            if r == 0:
                union(idx, roof)
            for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                nr, nc = r + dr, c + dc
                if 0 <= nr < R and 0 <= nc < C and g[nr][nc] == 1:
                    union(idx, nr * C + nc)
            cur = sz[find(roof)]
            if find(idx) == find(roof):
                ans.append(max(0, cur - prev - 1))
            else:
                ans.append(0)

        ans.reverse()
        return ans

def test():
    sol = Solution()
    g1 = [[1, 0, 0, 0], [1, 1, 1, 0]]
    h1 = [[1, 0]]
    assert sol.hitBricks(g1, h1) == [2], "test 1 failed"
    g2 = [[1, 0, 0, 0], [1, 1, 0, 0]]
    h2 = [[1, 1], [1, 0]]
    assert sol.hitBricks(g2, h2) == [0, 0], "test 2 failed"
    print("✓ bricks-falling-when-hit passed")

if __name__ == "__main__":
    test()
