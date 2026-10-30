from collections import deque

class Solution:
    def maximumDetonation(self, bombs: list[list[int]]) -> int:
        n = len(bombs)
        adj = [[] for _ in range(n)]

        for i in range(n):
            x1, y1, r1 = bombs[i]
            r1_sq = r1 * r1
            for j in range(n):
                if i != j:
                    x2, y2, _ = bombs[j]
                    dist_sq = (x1 - x2) ** 2 + (y1 - y2) ** 2
                    if dist_sq <= r1_sq:
                        adj[i].append(j)

        max_detonated = 0

        for start in range(n):
            visited = {start}
            queue = deque([start])
            while queue:
                curr = queue.popleft()
                for neighbor in adj[curr]:
                    if neighbor not in visited:
                        visited.add(neighbor)
                        queue.append(neighbor)
            max_detonated = max(max_detonated, len(visited))

        return max_detonated
