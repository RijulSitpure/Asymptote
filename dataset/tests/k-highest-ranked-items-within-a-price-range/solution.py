import collections
from typing import List

class Solution:
    def highestRankedKItems(self, grid: List[List[int]], pricing: List[int], start: List[int], k: int) -> List[List[int]]:
        m, n = len(grid), len(grid[0])
        low, high = pricing
        sr, sc = start
        q = collections.deque([(sr, sc, 0)])
        visited = [[False] * n for _ in range(m)]
        visited[sr][sc] = True
        items = []
        if low <= grid[sr][sc] <= high:
            items.append((0, grid[sr][sc], sr, sc))
        
        while q:
            r, c, d = q.popleft()
            for dr, dc in [(-1,0), (1,0), (0,-1), (0,1)]:
                nr, nc = r + dr, c + dc
                if 0 <= nr < m and 0 <= nc < n and not visited[nr][nc] and grid[nr][nc] != 0:
                    visited[nr][nc] = True
                    q.append((nr, nc, d + 1))
                    if low <= grid[nr][nc] <= high:
                        items.append((d + 1, grid[nr][nc], nr, nc))
        items.sort()
        return [[r, c] for _, _, r, c in items[:k]]
