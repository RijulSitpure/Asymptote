class Solution:
    def maxSubgraphScore(self, n: int, edges: list[list[int]], vals: list[int]) -> int:
        adj = [[] for _ in range(n)]
        for u, v in edges:
            adj[u].append(v)
            adj[v].append(u)
        
        best = float('-inf')
        
        def dfs(u: int, p: int) -> int:
            nonlocal best
            cur = vals[u]
            for v in adj[u]:
                if v != p:
                    child_gain = dfs(v, u)
                    if child_gain > 0:
                        cur += child_gain
            best = max(best, cur)
            return cur
        
        dfs(0, -1)
        return best

def run_tests():
    sol = Solution()
    assert sol.maxSubgraphScore(3, [[0, 1], [1, 2]], [1, -2, 3]) == 3
    assert sol.maxSubgraphScore(4, [[0, 1], [1, 2], [2, 3]], [2, 3, -1, 4]) == 8
    print("All tests passed for 3772.")

if __name__ == "__main__":
    run_tests()
