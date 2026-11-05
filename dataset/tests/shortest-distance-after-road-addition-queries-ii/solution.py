class Solution:
    def shortestDistanceAfterQueries(self, n: int, queries: list[list[int]]) -> list[int]:
        nxt = list(range(1, n)) + [0]
        dist = n - 1
        ans = []
        for u, v in queries:
            curr = nxt[u]
            while curr < v:
                dist -= 1
                temp = nxt[curr]
                nxt[curr] = v
                curr = temp
            nxt[u] = max(nxt[u], v)
            ans.append(dist)
        return ans
