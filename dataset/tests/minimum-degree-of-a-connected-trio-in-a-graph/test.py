class Solution:
    def minTrioDegree(self, n: int, edges: list[list[int]]) -> int:
        adj = [[False] * (n + 1) for _ in range(n + 1)]
        degree = [0] * (n + 1)
        for u, v in edges:
            adj[u][v] = True
            adj[v][u] = True
            degree[u] += 1
            degree[v] += 1

        ans = float('inf')
        for u in range(1, n + 1):
            for v in range(u + 1, n + 1):
                if adj[u][v]:
                    for w in range(v + 1, n + 1):
                        if adj[u][w] and adj[v][w]:
                            ans = min(ans, degree[u] + degree[v] + degree[w] - 6)

        return ans if ans != float('inf') else -1

def test():
    sol = Solution()
    assert sol.minTrioDegree(6, [[1,2],[1,3],[3,2],[4,1],[5,2],[3,6]]) == 3
    assert sol.minTrioDegree(7, [[1,3],[4,1],[4,3],[2,5],[5,6],[6,7],[7,5],[2,6]]) == 0

    print("✓ minimum-degree-of-a-connected-trio-in-a-graph passed")

if __name__ == '__main__':
    test()
