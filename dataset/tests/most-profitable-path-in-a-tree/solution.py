class Solution:
    def mostProfitablePath(self, edges: list[list[int]], bob: int, amount: list[int]) -> int:
        n = len(amount)
        adj = [[] for _ in range(n)]
        for u, v in edges:
            adj[u].append(v)
            adj[v].append(u)
        bob_time = {}
        def find_bob(u, p, t):
            if u == 0:
                bob_time[u] = t
                return True
            for v in adj[u]:
                if v != p and find_bob(v, u, t + 1):
                    bob_time[u] = t
                    return True
            return False
        find_bob(bob, -1, 0)
        ans = float('-inf')
        def dfs_alice(u, p, t, current_sum):
            nonlocal ans
            if u not in bob_time or t < bob_time[u]:
                current_sum += amount[u]
            elif t == bob_time[u]:
                current_sum += amount[u] // 2
            is_leaf = True
            for v in adj[u]:
                if v != p:
                    is_leaf = False
                    dfs_alice(v, u, t + 1, current_sum)
            if is_leaf:
                ans = max(ans, current_sum)
        dfs_alice(0, -1, 0, 0)
        return ans
