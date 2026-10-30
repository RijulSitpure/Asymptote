import math

class Solution:
    def getCoprimes(self, nums: list[int], edges: list[list[int]]) -> list[int]:
        n = len(nums)
        adj = [[] for _ in range(n)]
        for u, v in edges:
            adj[u].append(v)
            adj[v].append(u)
        coprimes = [[] for _ in range(51)]
        for i in range(1, 51):
            for j in range(1, 51):
                if math.gcd(i, j) == 1:
                    coprimes[i].append(j)
        ans = [-1] * n
        history = [[] for _ in range(51)]
        def dfs(u, parent, d):
            val = nums[u]
            best_depth = -1
            best_node = -1
            for c in coprimes[val]:
                if history[c]:
                    cand_node, cand_depth = history[c][-1]
                    if cand_depth > best_depth:
                        best_depth = cand_depth
                        best_node = cand_node
            ans[u] = best_node
            history[val].append((u, d))
            for v in adj[u]:
                if v != parent:
                    dfs(v, u, d + 1)
            history[val].pop()
        dfs(0, -1, 0)
        return ans

sol = Solution()
assert sol.getCoprimes([2,3,3,2], [[0,1],[1,2],[1,3]]) == [-1, 0, 0, 1]
print("All tests passed successfully.")
