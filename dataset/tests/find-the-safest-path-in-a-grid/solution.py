from typing import List, Optional
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
class Solution:
    def maximumSafenessFactor(self, grid: List[List[int]]) -> int:
        from collections import deque
        n = len(grid)
        if grid[0][0] == 1 or grid[n - 1][n - 1] == 1:
            return 0
        dist = [[-1] * n for _ in range(n)]
        q = deque()
        for r in range(n):
            for c in range(n):
                if grid[r][c] == 1:
                    dist[r][c] = 0
                    q.append((r, c))
        while q:
            r, c = q.popleft()
            for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                nr, nc = r + dr, c + dc
                if 0 <= nr < n and 0 <= nc < n and dist[nr][nc] == -1:
                    dist[nr][nc] = dist[r][c] + 1
                    q.append((nr, nc))
        low, high = 0, min(dist[0][0], dist[n - 1][n - 1])
        ans = 0
        while low <= high:
            mid = (low + high) // 2
            visited = [[False] * n for _ in range(n)]
            visited[0][0] = True
            check_q = deque([(0, 0)])
            reachable = False
            while check_q:
                r, c = check_q.popleft()
                if r == n - 1 and c == n - 1:
                    reachable = True
                    break
                for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                    nr, nc = r + dr, c + dc
                    if 0 <= nr < n and 0 <= nc < n and not visited[nr][nc] and dist[nr][nc] >= mid:
                        visited[nr][nc] = True
                        check_q.append((nr, nc))
            if reachable:
                ans = mid
                low = mid + 1
            else:
                high = mid - 1
        return ans
