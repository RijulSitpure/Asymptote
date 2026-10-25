class Solution:
    def maximalNetworkRank(self, n: int, roads: list[list[int]]) -> int:
        deg = [0] * n
        adj = set()
        for u, v in roads:
            deg[u] += 1
            deg[v] += 1
            adj.add((min(u, v), max(u, v)))
        max_rank = 0
        for i in range(n):
            for j in range(i + 1, n):
                rank = deg[i] + deg[j]
                if (i, j) in adj:
                    rank -= 1
                max_rank = max(max_rank, rank)
        return max_rank

def test():
    sol = Solution()
    assert sol.maximalNetworkRank(4, [[0,1],[0,3],[1,2],[1,3]]) == 4
    assert sol.maximalNetworkRank(5, [[0,1],[0,3],[1,2],[1,3],[2,3],[2,4]]) == 5
    assert sol.maximalNetworkRank(8, [[0,1],[1,2],[2,3],[2,4],[5,6],[5,7]]) == 5

    print("✓ maximal-network-rank passed")

if __name__ == '__main__':
    test()
