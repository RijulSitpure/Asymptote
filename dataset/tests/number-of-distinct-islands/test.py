from typing import List

class Solution:
    def numDistinctIslands(self, grid: List[List[int]]) -> int:
        m, n = len(grid), len(grid[0])
        visited = set()
        distinct = set()

        for r in range(m):
            for c in range(n):
                if grid[r][c] == 1 and (r, c) not in visited:
                    shape = []
                    stack = [(r, c)]
                    visited.add((r, c))
                    while stack:
                        cr, cc = stack.pop()
                        shape.append((cr - r, cc - c))
                        for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                            nr, nc = cr + dr, cc + dc
                            if 0 <= nr < m and 0 <= nc < n and grid[nr][nc] == 1 and (nr, nc) not in visited:
                                visited.add((nr, nc))
                                stack.append((nr, nc))
                    distinct.add(tuple(sorted(shape)))

        return len(distinct)

def test():
    sol = Solution()
    g1 = [
        [1,1,0,0,0],
        [1,1,0,0,0],
        [0,0,0,1,1],
        [0,0,0,1,1]
    ]
    assert sol.numDistinctIslands(g1) == 1, "test 1 failed"
    g2 = [
        [1,1,0,1,1],
        [1,0,0,0,0],
        [0,0,0,0,1],
        [1,1,0,1,1]
    ]
    assert sol.numDistinctIslands(g2) == 3, "test 2 failed"
    print("✓ number-of-distinct-islands passed")

if __name__ == "__main__":
    test()
