from typing import List

class Solution:
    def colorBorder(self, grid: List[List[int]], row: int, col: int, color: int) -> List[List[int]]:
        m, n = len(grid), len(grid[0])
        start_color = grid[row][col]
        if start_color == color:
            return grid

        borders = []
        visited = set()

        def dfs(r: int, c: int):
            visited.add((r, c))
            is_border = False
            for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                nr, nc = r + dr, c + dc
                if nr < 0 or nr >= m or nc < 0 or nc >= n:
                    is_border = True
                elif (nr, nc) not in visited:
                    if grid[nr][nc] == start_color:
                        dfs(nr, nc)
                    else:
                        is_border = True
            if is_border:
                borders.append((r, c))

        dfs(row, col)
        for r, c in borders:
            grid[r][c] = color
        return grid

def test():
    sol = Solution()
    assert sol.colorBorder([[1,1],[1,2]], 0, 0, 3) == [[3,3],[3,2]], "test 1 failed"
    assert sol.colorBorder([[1,2,2],[2,3,2]], 0, 1, 3) == [[1,3,3],[2,3,3]], "test 2 failed"
    print("✓ coloring-a-border passed")

if __name__ == "__main__":
    test()
