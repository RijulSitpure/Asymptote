from typing import List, Optional
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
class Solution:
    def minimumSeconds(self, land: List[List[str]]) -> int:
        from collections import deque
        R, C = len(land), len(land[0])
        water_time = [[float('inf')] * C for _ in range(R)]
        water_q = deque()
        start = (0, 0)
        for r in range(R):
            for c in range(C):
                if land[r][c] == '*':
                    water_time[r][c] = 0
                    water_q.append((r, c))
                elif land[r][c] == 'S':
                    start = (r, c)
        dirs = [(-1, 0), (1, 0), (0, -1), (0, 1)]
        while water_q:
            r, c = water_q.popleft()
            for dr, dc in dirs:
                nr, nc = r + dr, c + dc
                if 0 <= nr < R and 0 <= nc < C and land[nr][nc] == '.' and water_time[nr][nc] == float('inf'):
                    water_time[nr][nc] = water_time[r][c] + 1
                    water_q.append((nr, nc))
        player_q = deque([(start[0], start[1], 0)])
        visited = [[False] * C for _ in range(R)]
        visited[start[0]][start[1]] = True
        while player_q:
            r, c, t = player_q.popleft()
            if land[r][c] == 'D':
                return t
            for dr, dc in dirs:
                nr, nc = r + dr, c + dc
                if 0 <= nr < R and 0 <= nc < C and not visited[nr][nc]:
                    if land[nr][nc] in ('.', 'D') and t + 1 < water_time[nr][nc]:
                        visited[nr][nc] = True
                        player_q.append((nr, nc, t + 1))
        return -1
