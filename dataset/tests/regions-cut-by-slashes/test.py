from typing import List

class Solution:
    def regionsBySlashes(self, grid: List[str]) -> int:
        n = len(grid)
        parent = list(range(4 * n * n))
        def find(x: int) -> int:
            if parent[x] != x:
                parent[x] = find(parent[x])
            return parent[x]
        def union(x: int, y: int):
            rx, ry = find(x), find(y)
            if rx != ry:
                parent[rx] = ry
        for r in range(n):
            for c in range(n):
                root = 4 * (r * n + c)
                val = grid[r][c]
                if val == "/":
                    union(root + 0, root + 3)
                    union(root + 1, root + 2)
                elif val == "\\":
                    union(root + 0, root + 1)
                    union(root + 2, root + 3)
                else:
                    union(root + 0, root + 1)
                    union(root + 1, root + 2)
                    union(root + 2, root + 3)
                if r + 1 < n:
                    union(root + 2, 4 * ((r + 1) * n + c) + 0)
                if c + 1 < n:
                    union(root + 1, 4 * (r * n + (c + 1)) + 3)
        return len({find(x) for x in range(4 * n * n)})

def test():
    sol = Solution()
    assert sol.regionsBySlashes([" /","/ "]) == 2, "test 1 failed"
    assert sol.regionsBySlashes([" /","  "]) == 1, "test 2 failed"
    assert sol.regionsBySlashes(["/\\","\\/"]) == 5, "test 3 failed"
    print("✓ regions-cut-by-slashes passed")

if __name__ == "__main__":
    test()
