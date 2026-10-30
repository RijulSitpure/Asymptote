class Solution:
    def waysToBuildRooms(self, prevRoom: list[int]) -> int:
        MOD = 10**9 + 7
        n = len(prevRoom)
        adj = [[] for _ in range(n)]
        for i in range(1, n):
            adj[prevRoom[i]].append(i)

        size = [1] * n
        order = []
        q = [0]
        while q:
            u = q.pop()
            order.append(u)
            for v in adj[u]:
                q.append(v)

        for u in reversed(order):
            for v in adj[u]:
                size[u] += size[v]

        fact = 1
        for i in range(1, n + 1):
            fact = (fact * i) % MOD

        denom = 1
        for s in size:
            denom = (denom * s) % MOD

        return (fact * pow(denom, MOD - 2, MOD)) % MOD

def test_ways_to_build():
    sol = Solution()
    assert sol.waysToBuildRooms([-1, 0, 1]) == 1
    assert sol.waysToBuildRooms([-1, 0, 0, 1, 2]) == 6

