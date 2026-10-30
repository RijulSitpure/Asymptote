class Solution:
    def rotateGrid(self, grid: list[list[int]], k: int) -> list[list[int]]:
        m, n = len(grid), len(grid[0])
        num_layers = min(m, n) // 2
        for layer in range(num_layers):
            r1, r2 = layer, m - 1 - layer
            c1, c2 = layer, n - 1 - layer
            coords = []
            for c in range(c1, c2):
                coords.append((r1, c))
            for r in range(r1, r2):
                coords.append((r, c2))
            for c in range(c2, c1, -1):
                coords.append((r2, c))
            for r in range(r2, r1, -1):
                coords.append((r, c1))
            vals = [grid[r][c] for r, c in coords]
            shift = k % len(vals)
            rotated_vals = vals[shift:] + vals[:shift]
            for (r, c), val in zip(coords, rotated_vals):
                grid[r][c] = val
        return grid

def test_rotate_grid():
    sol = Solution()
    g1 = [
        [40, 10],
        [30, 20]
    ]
    assert sol.rotateGrid(g1, 1) == [
        [10, 20],
        [40, 30]
    ]

