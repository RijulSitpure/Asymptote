from typing import List
from collections import deque

class Solution:
    def isEscapePossible(self, blocked: List[List[int]], source: List[int], target: List[int]) -> bool:
        blocked_set = set(map(tuple, blocked))
        MAX_VISIT = len(blocked) * (len(blocked) - 1) // 2

        def bfs(start, dest):
            visited = {start}
            q = deque([start])
            while q and len(visited) <= MAX_VISIT:
                r, c = q.popleft()
                if (r, c) == dest:
                    return True
                for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                    nr, nc = r + dr, c + dc
                    if 0 <= nr < 10**6 and 0 <= nc < 10**6 and (nr, nc) not in blocked_set and (nr, nc) not in visited:
                        visited.add((nr, nc))
                        q.append((nr, nc))
            return len(visited) > MAX_VISIT

        s = tuple(source)
        t = tuple(target)
        return bfs(s, t) and bfs(t, s)

def test():
    sol = Solution()
    assert sol.isEscapePossible([[0,1],[1,0]], [0,0], [0,2]) == False, "test 1 failed"
    assert sol.isEscapePossible([], [0,0], [999999,999999]) == True, "test 2 failed"
    print("✓ escape-a-large-maze passed")

if __name__ == "__main__":
    test()
