from typing import List
from collections import deque

class Solution:
    def minimumWeight(self, edges: List[List[int]], queries: List[List[int]]) -> List[int]:
        n = len(edges) + 1
        graph = [[] for _ in range(n)]
        for u, v, w in edges:
            graph[u].append((v, w))
            graph[v].append((u, w))

        LOG = n.bit_length() + 1
        up = [[0] * LOG for _ in range(n)]
        depth = [0] * n
        dist = [0] * n

        q = deque([0])
        visited = [False] * n
        visited[0] = True

        while q:
            u = q.popleft()
            for v, w in graph[u]:
                if not visited[v]:
                    visited[v] = True
                    up[v][0] = u
                    depth[v] = depth[u] + 1
                    dist[v] = dist[u] + w
                    q.append(v)

        for j in range(1, LOG):
            for i in range(n):
                up[i][j] = up[up[i][j - 1]][j - 1]

        def lca(u: int, v: int) -> int:
            if depth[u] > depth[v]:
                u, v = v, u
            diff = depth[v] - depth[u]
            for i in range(LOG):
                if (diff >> i) & 1:
                    v = up[v][i]
            if u == v:
                return u
            for i in range(LOG - 1, -1, -1):
                if up[u][i] != up[v][i]:
                    u = up[u][i]
                    v = up[v][i]
            return up[u][0]

        def distance(u: int, v: int) -> int:
            return dist[u] + dist[v] - 2 * dist[lca(u, v)]

        ans = []
        for s1, s2, d in queries:
            ans.append((distance(s1, s2) + distance(s1, d) + distance(s2, d)) // 2)
        return ans

def run_tests():
    s = Solution()
    res = s.minimumWeight([[0, 1, 1], [1, 2, 2]], [[0, 2, 1]])
    assert res == [3], f"Expected [3], got {res}"
    print("3553 minimum-weighted-subgraph-with-the-required-paths-ii PASSED")

if __name__ == "__main__":
    run_tests()
