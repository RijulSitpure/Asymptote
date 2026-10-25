from collections import defaultdict

class Solution:
    def numOfMinutes(self, n: int, headID: int, manager: list[int], informTime: list[int]) -> int:
        adj = defaultdict(list)
        for emp, mgr in enumerate(manager):
            if mgr != -1:
                adj[mgr].append(emp)
        def dfs(u):
            cur_max = 0
            for v in adj[u]:
                cur_max = max(cur_max, dfs(v))
            return informTime[u] + cur_max
        return dfs(headID)

def test():
    sol = Solution()
    assert sol.numOfMinutes(1, 0, [-1], [0]) == 0, "test 1 failed"
    assert sol.numOfMinutes(6, 2, [2,2,-1,2,2,2], [0,0,1,0,0,0]) == 1, "test 2 failed"
    print("✓ time-needed-to-inform-all-employees passed")

if __name__ == "__main__":
    test()
