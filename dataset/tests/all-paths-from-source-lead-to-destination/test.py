from typing import List

class Solution:
    def leadsToDestination(self, n: int, edges: List[List[int]], source: int, destination: int) -> bool:
        adj = [[] for _ in range(n)]
        for u, v in edges:
            adj[u].append(v)

        if adj[destination]:
            return False

        state = [0] * n

        def dfs(u: int) -> bool:
            if state[u] != 0:
                return state[u] == 2
            if not adj[u]:
                return u == destination
            state[u] = 1
            for v in adj[u]:
                if not dfs(v):
                    return False
            state[u] = 2
            return True

        return dfs(source)

def test():
    sol = Solution()
    assert sol.leadsToDestination(3, [[0,1],[0,2]], 0, 2) == False, "test 1 failed"
    assert sol.leadsToDestination(4, [[0,1],[0,3],[1,2],[2,1]], 0, 3) == False, "test 2 failed"
    assert sol.leadsToDestination(4, [[0,1],[0,2],[1,3],[2,3]], 0, 3) == True, "test 3 failed"
    print("✓ all-paths-from-source-lead-to-destination passed")

if __name__ == "__main__":
    test()
