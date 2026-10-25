class Solution:
    def countSubgraphsForEachDiameter(self, n: int, edges: list[list[int]]) -> list[int]:
        dist = [[float("inf")] * n for _ in range(n)]
        for i in range(n):
            dist[i][i] = 0
        edge_list = []
        for u, v in edges:
            u -= 1
            v -= 1
            dist[u][v] = 1
            dist[v][u] = 1
            edge_list.append((u, v))
        for k in range(n):
            for i in range(n):
                for j in range(n):
                    if dist[i][k] + dist[k][j] < dist[i][j]:
                        dist[i][j] = dist[i][k] + dist[k][j]
        ans = [0] * (n - 1)
        for mask in range(1, 1 << n):
            nodes = [i for i in range(n) if mask & (1 << i)]
            if len(nodes) < 2:
                continue
            e_count = sum(1 for u, v in edge_list if (mask & (1 << u)) and (mask & (1 << v)))
            if e_count != len(nodes) - 1:
                continue
            max_d = 0
            for i in range(len(nodes)):
                for j in range(i + 1, len(nodes)):
                    max_d = max(max_d, dist[nodes[i]][nodes[j]])
            if max_d > 0:
                ans[max_d - 1] += 1
        return ans

def test():
    sol = Solution()
    assert sol.countSubgraphsForEachDiameter(4, [[1,2],[2,3],[2,4]]) == [3,4,0]
    assert sol.countSubgraphsForEachDiameter(2, [[1,2]]) == [1]
    assert sol.countSubgraphsForEachDiameter(3, [[1,2],[2,3]]) == [2,1]

    print("✓ count-subtrees-with-max-distance-between-cities passed")

if __name__ == '__main__':
    test()
