from typing import List

class Solution:
    def assignEdgeWeights(self, edges: List[List[int]], queries: List[List[int]]) -> List[int]:
        MOD = 1_000_000_007
        num_nodes = len(edges) + 1
        graph = [[] for _ in range(num_nodes + 1)]
        for u, v in edges:
            graph[u].append(v)
            graph[v].append(u)

        kLog = 20
        parent = [[0] * (num_nodes + 1) for _ in range(kLog)]
        depth = [0] * (num_nodes + 1)

        def dfs(u: int, p: int, d: int) -> None:
            depth[u] = d
            parent[0][u] = p
            for v in graph[u]:
                if v != p:
                    dfs(v, u, d + 1)

        dfs(1, 0, 0)

        for k in range(1, kLog):
            for i in range(1, num_nodes + 1):
                parent[k][i] = parent[k - 1][parent[k - 1][i]]

        def lca(u: int, v: int) -> int:
            if depth[u] < depth[v]:
                u, v = v, u
            for k in range(kLog - 1, -1, -1):
                if depth[u] - (1 << k) >= depth[v]:
                    u = parent[k][u]
            if u == v:
                return u
            for k in range(kLog - 1, -1, -1):
                if parent[k][u] != parent[k][v]:
                    u = parent[k][u]
                    v = parent[k][v]
            return parent[0][u]

        ans = []
        for u, v in queries:
            if u == v:
                ans.append(0)
            else:
                anc = lca(u, v)
                d = depth[u] + depth[v] - 2 * depth[anc]
                ans.append(pow(2, d - 1, MOD))
        return ans

def run_tests():
    s = Solution()
    res = s.assignEdgeWeights([[1, 2], [2, 3]], [[1, 3]])
    assert res == [2], f"Expected [2], got {res}"
    print("3559 number-of-ways-to-assign-edge-weights-ii PASSED")

if __name__ == "__main__":
    run_tests()
