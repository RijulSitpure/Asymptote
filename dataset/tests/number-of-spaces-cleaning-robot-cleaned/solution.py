class Solution:
    def numberOfSpacesCleaned(self, room: list[list[int]]) -> int:
        m, n = len(room), len(room[0])
        dirs = [(0, 1), (1, 0), (0, -1), (-1, 0)]
        row, col = 0, 0
        direction = 0
        cleaned = set()
        visited = set()

        while (row, col, direction) not in visited:
            visited.add((row, col, direction))
            cleaned.add((row, col))

            nr = row + dirs[direction][0]
            nc = col + dirs[direction][1]
            if 0 <= nr < m and 0 <= nc < n and room[nr][nc] == 0:
                row, col = nr, nc
            else:
                direction = (direction + 1) % 4

        return len(cleaned)
