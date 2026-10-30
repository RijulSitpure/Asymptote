from collections import defaultdict

class Solution:
    def validArrangement(self, pairs: list[list[int]]) -> list[list[int]]:
        adj = defaultdict(list)
        in_degree = defaultdict(int)
        out_degree = defaultdict(int)

        for u, v in pairs:
            adj[u].append(v)
            out_degree[u] += 1
            in_degree[v] += 1

        start = pairs[0][0]
        for node in out_degree:
            if out_degree[node] - in_degree[node] == 1:
                start = node
                break

        route = []
        stack = [start]
        while stack:
            while adj[stack[-1]]:
                stack.append(adj[stack[-1]].pop())
            route.append(stack.pop())

        route.reverse()
        return [[route[i], route[i + 1]] for i in range(len(route) - 1)]
