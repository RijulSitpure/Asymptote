from collections import deque

class Solution:
    def shortestAlternatingPaths(self, n: int, redEdges: list[list[int]], blueEdges: list[list[int]]) -> list[int]:
        red_adj = [[] for _ in range(n)]
        blue_adj = [[] for _ in range(n)]
        for u, v in redEdges:
            red_adj[u].append(v)
        for u, v in blueEdges:
            blue_adj[u].append(v)

        res = [-1] * n
        q = deque([(0, 0, 0), (0, 1, 0)])
        visited = {(0, 0), (0, 1)}

        while q:
            u, color, d = q.popleft()
            if res[u] == -1:
                res[u] = d
            nxt_adj = blue_adj if color == 0 else red_adj
            nxt_color = 1 if color == 0 else 0
            for v in nxt_adj[u]:
                if (v, nxt_color) not in visited:
                    visited.add((v, nxt_color))
                    q.append((v, nxt_color, d + 1))
        return res

sol = Solution()
assert sol.shortestAlternatingPaths(3, [[0,1],[1,2]], []) == [0, 1, -1]
assert sol.shortestAlternatingPaths(3, [[0,1]], [[2,1]]) == [0, 1, -1]
print("All tests passed successfully.")
