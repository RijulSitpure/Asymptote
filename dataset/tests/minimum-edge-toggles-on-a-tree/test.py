class Solution:
    def minEdgeToggles(self, n: int, edges: list[list[int]]) -> int:
        adj = [[] for _ in range(n)]
        for i, (u, v, state) in enumerate(edges):
            adj[u].append((v, state))
            adj[v].append((u, state))
        
        toggles = [0] * n
        
        def dfs(u: int, p: int, edge_state: int) -> bool:
            for v, s in adj[u]:
                if v != p:
                    if not dfs(v, u, s):
                        return False
            effective_state = edge_state ^ toggles[u]
            if effective_state == 1:
                toggles[u] ^= 1
            return True
        
        dfs(0, -1, 0)
        return sum(toggles)

def run_tests():
    sol = Solution()
    # 2 nodes, edge 0-1 state 1 -> toggle node 1 resolves edge
    assert sol.minEdgeToggles(2, [[0, 1, 1]]) == 1
    assert sol.minEdgeToggles(2, [[0, 1, 0]]) == 0
    print("All tests passed for 3812.")

if __name__ == "__main__":
    run_tests()
