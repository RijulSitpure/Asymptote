class Fenwick:
    def __init__(self, size: int):
        self.tree = [0] * (size + 2)
    def add(self, i: int, val: int):
        while i < len(self.tree):
            self.tree[i] += val
            i += i & (-i)
    def query(self, i: int) -> int:
        s = 0
        while i > 0:
            s += self.tree[i]
            i -= i & (-i)
        return s

class Solution:
    def treeQueries(self, n: int, edges: list[list[int]], queries: list[list[int]]) -> list[int]:
        graph = [[] for _ in range(n + 1)]
        edge_weights = {}
        for u, v, w in edges:
            graph[u].append((v, w))
            graph[v].append((u, w))
            edge_weights[(min(u, v), max(u, v))] = w

        in_time = [0] * (n + 1)
        out_time = [0] * (n + 1)
        parent = [0] * (n + 1)
        dist = [0] * (n + 1)
        timer = 0

        def dfs(u, p, d):
            nonlocal timer
            timer += 1
            in_time[u] = timer
            parent[u] = p
            dist[u] = d
            for v, w in graph[u]:
                if v != p:
                    dfs(v, u, d + w)
            out_time[u] = timer

        dfs(1, 0, 0)
        bit = Fenwick(n + 2)
        for i in range(1, n + 1):
            bit.add(in_time[i], dist[i])
            bit.add(in_time[i] + 1, -dist[i])

        ans = []
        for q in queries:
            if q[0] == 1:
                u, v, nw = q[1], q[2], q[3]
                key = (min(u, v), max(u, v))
                delta = nw - edge_weights[key]
                edge_weights[key] = nw
                child = v if parent[v] == u else u
                bit.add(in_time[child], delta)
                bit.add(out_time[child] + 1, -delta)
            else:
                x = q[1]
                ans.append(bit.query(in_time[x]))
        return ans

def run_tests():
    s = Solution()
    assert s.treeQueries(3, [[1, 2, 2], [1, 3, 4]], [[2, 2], [1, 1, 2, 5], [2, 2], [2, 3]]) == [2, 5, 4]
    print("All tests passed for shortest-path-in-a-weighted-tree")

if __name__ == '__main__':
    run_tests()
