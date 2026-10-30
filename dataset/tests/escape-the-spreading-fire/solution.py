from collections import deque

class Solution:
    def maximumMinutes(self, grid: list[list[int]]) -> int:
        m, n = len(grid), len(grid[0])
        fire = [[float("inf")] * n for _ in range(m)]
        q = deque()
        for r in range(m):
            for c in range(n):
                if grid[r][c] == 1:
                    fire[r][c] = 0
                    q.append((r, c))

        while q:
            r, c = q.popleft()
            for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                nr, nc = r + dr, c + dc
                if 0 <= nr < m and 0 <= nc < n and grid[nr][nc] == 0:
                    if fire[nr][nc] > fire[r][c] + 1:
                        fire[nr][nc] = fire[r][c] + 1
                        q.append((nr, nc))

        def can_escape(wait: int) -> bool:
            if fire[0][0] <= wait:
                return False
            visited = [[False] * n for _ in range(m)]
            visited[0][0] = True
            q_person = deque([(0, 0, wait)])
            while q_person:
                r, c, t = q_person.popleft()
                if r == m - 1 and c == n - 1:
                    return True
                for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                    nr, nc = r + dr, c + dc
                    if 0 <= nr < m and 0 <= nc < n and grid[nr][nc] == 0 and not visited[nr][nc]:
                        arrival = t + 1
                        if nr == m - 1 and nc == n - 1:
                            if arrival <= fire[nr][nc]:
                                visited[nr][nc] = True
                                q_person.append((nr, nc, arrival))
                        else:
                            if arrival < fire[nr][nc]:
                                visited[nr][nc] = True
                                q_person.append((nr, nc, arrival))
            return False

        lo, hi = 0, m * n
        ans = -1
        while lo <= hi:
            mid = (lo + hi) // 2
            if can_escape(mid):
                ans = mid
                lo = mid + 1
            else:
                hi = mid - 1

        if ans == -1:
            return -1
        if can_escape(10**9):
            return 10**9
        return ans
