class Solution:
    def minTime(self, n: int, edges: list[list[int]], hasApple: list[bool]) -> int:
        adj = [[] for _ in range(n)]
        for u, v in edges:
            adj[u].append(v)
            adj[v].append(u)
        def dfs(u, parent):
            total_time = 0
            for v in adj[u]:
                if v != parent:
                    child_time = dfs(v, u)
                    if child_time > 0 or hasApple[v]:
                        total_time += child_time + 2
            return total_time
        return dfs(0, -1)

def test():
    sol = Solution()
    assert sol.minTime(7, [[0,1],[0,2],[1,4],[1,5],[2,3],[2,6]], [False,False,True,False,True,True,False]) == 8, "test 1 failed"
    assert sol.minTime(7, [[0,1],[0,2],[1,4],[1,5],[2,3],[2,6]], [False,False,True,False,False,True,False]) == 6, "test 2 failed"
    assert sol.minTime(7, [[0,1],[0,2],[1,4],[1,5],[2,3],[2,6]], [False,False,False,False,False,False,False]) == 0, "test 3 failed"
    print("✓ minimum-time-to-collect-all-apples-in-a-tree passed")

if __name__ == "__main__":
    test()
