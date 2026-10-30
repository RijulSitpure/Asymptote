import collections
from typing import List

class Solution:
    def removeOnes(self, grid: List[List[int]]) -> int:
        m, n = len(grid), len(grid[0])
        initial = 0
        for r in range(m):
            for c in range(n):
                if grid[r][c] == 1:
                    initial |= 1 << (r * n + c)
        if initial == 0:
            return 0
            
        q = collections.deque([(initial, 0)])
        visited = {initial}
        while q:
            state, steps = q.popleft()
            for r in range(m):
                for c in range(n):
                    if (state >> (r * n + c)) & 1:
                        next_state = state
                        for col in range(n):
                            next_state &= ~(1 << (r * n + col))
                        for row in range(m):
                            next_state &= ~(1 << (row * n + c))
                        if next_state == 0:
                            return steps + 1
                        if next_state not in visited:
                            visited.add(next_state)
                            q.append((next_state, steps + 1))
        return 0
