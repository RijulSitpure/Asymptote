from typing import List, Optional
from collections import Counter, defaultdict, deque
from bisect import bisect_left, bisect_right
import math

class Solution:
    def minOperationsQueries(self, n: int, edges: List[List[int]], queries: List[List[int]]) -> List[int]:
        adj = [[] for _ in range(n)]
        for u, v, w in edges:
            adj[u].append((v, w))
            adj[v].append((u, w))
        depth = [0] * n
        up = [[0] * 15 for _ in range(n)]
        cnt = [[0] * 27 for _ in range(n)]
        stack = [(0, 0, 0, 0)]
        visited = [False] * n
        order = []
        parent = [0] * n
        depth[0] = 0
        visited[0] = True
        q = [0]
        while q:
            u = q.pop(0)
            order.append(u)
            for v, w in adj[u]:
                if not visited[v]:
                    visited[v] = True
                    depth[v] = depth[u] + 1
                    up[v][0] = u
                    for c in range(1, 27):
                        cnt[v][c] = cnt[u][c]
                    cnt[v][w] += 1
                    q.append(v)
        for j in range(1, 15):
            for i in range(n):
                up[i][j] = up[up[i][j - 1]][j - 1]
        def get_lca(u, v):
            if depth[u] < depth[v]:
                u, v = v, u
            diff = depth[u] - depth[v]
            for i in range(15):
                if (diff >> i) & 1:
                    u = up[u][i]
            if u == v:
                return u
            for i in range(14, -1, -1):
                if up[u][i] != up[v][i]:
                    u = up[u][i]
                    v = up[v][i]
            return up[u][0]
        ans = []
        for u, v in queries:
            lca = get_lca(u, v)
            path_len = depth[u] + depth[v] - 2 * depth[lca]
            max_freq = 0
            for w in range(1, 27):
                c = cnt[u][w] + cnt[v][w] - 2 * cnt[lca][w]
                if c > max_freq:
                    max_freq = c
            ans.append(path_len - max_freq)
        return ans
