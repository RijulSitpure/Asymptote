import sys, os
base = os.path.dirname(os.path.abspath(__file__))
sol_file = os.path.join(base, '..', '..', 'problems', 'number-of-distinct-islands-ii.json')

grid = [
  [1,1,0,0,0],
  [1,0,0,0,0],
  [0,0,0,0,1],
  [0,0,0,1,1]
]

class Solution:
    def numDistinctIslands2(self, grid: list[list[int]]) -> int:
        R, C = len(grid), len(grid[0])
        visited = set()

        def get_shape(r0, c0):
            cells = []
            st = [(r0, c0)]
            visited.add((r0, c0))
            while st:
                r, c = st.pop()
                cells.append((r, c))
                for nr, nc in ((r+1,c), (r-1,c), (r,c+1), (r,c-1)):
                    if 0 <= nr < R and 0 <= nc < C and grid[nr][nc] == 1 and (nr, nc) not in visited:
                        visited.add((nr, nc))
                        st.append((nr, nc))
            forms = []
            for sign_x, sign_y in ((1, 1), (1, -1), (-1, 1), (-1, -1)):
                for swap in (False, True):
                    pts = []
                    for r, c in cells:
                        x, y = (c, r) if swap else (r, c)
                        pts.append((x * sign_x, y * sign_y))
                    pts.sort()
                    ox, oy = pts[0]
                    normalized = tuple((px - ox, py - oy) for px, py in pts)
                    forms.append(normalized)
            return min(forms)

        unique = set()
        for r in range(R):
            for c in range(C):
                if grid[r][c] == 1 and (r, c) not in visited:
                    unique.add(get_shape(r, c))
        return len(unique)

sol = Solution()
assert sol.numDistinctIslands2(grid) == 1
print("✓ number-of-distinct-islands-ii passed")
