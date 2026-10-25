class Solution:
    def minReorder(self, n: int, connections: list[list[int]]) -> int:
        adj = [[] for _ in range(n)]
        for u, v in connections:
            adj[u].append((v, 1))
            adj[v].append((u, 0))
        visited = [False] * n
        visited[0] = True
        reorders = 0
        stack = [0]
        while stack:
            u = stack.pop()
            for v, cost in adj[u]:
                if not visited[v]:
                    visited[v] = True
                    reorders += cost
                    stack.append(v)
        return reorders

def test():
    sol = Solution()
    assert sol.minReorder(6, [[0,1],[1,3],[2,3],[4,0],[4,5]]) == 3, "test 1 failed"
    assert sol.minReorder(5, [[1,0],[1,2],[3,2],[3,4]]) == 2, "test 2 failed"
    assert sol.minReorder(3, [[1,0],[2,0]]) == 0, "test 3 failed"
    print("✓ reorder-routes-to-make-all-paths-lead-to-the-city-zero passed")

if __name__ == "__main__":
    test()
