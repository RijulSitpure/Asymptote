class Solution:
    def minimumCost(self, source: str, target: str, original: list[str], changed: list[str], cost: list[int]) -> int:
        INF = float('inf')
        dist = [[INF] * 26 for _ in range(26)]
        for i in range(26):
            dist[i][i] = 0
        for u, v, w in zip(original, changed, cost):
            x = ord(u) - ord('a')
            y = ord(v) - ord('a')
            dist[x][y] = min(dist[x][y], w)
        for k in range(26):
            for i in range(26):
                for j in range(26):
                    if dist[i][k] + dist[k][j] < dist[i][j]:
                        dist[i][j] = dist[i][k] + dist[k][j]
        ans = 0
        for s, t in zip(source, target):
            x = ord(s) - ord('a')
            y = ord(t) - ord('a')
            if dist[x][y] == INF:
                return -1
            ans += dist[x][y]
        return ans
