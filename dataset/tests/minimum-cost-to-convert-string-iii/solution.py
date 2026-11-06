def minCostToConvertString(source: str, target: str, original: list[str], changed: list[str], cost: list[int]) -> int:
    INF = 10**15
    dist = [[INF] * 26 for _ in range(26)]
    for i in range(26):
        dist[i][i] = 0
    for u, v, c in zip(original, changed, cost):
        ui = ord(u) - ord('a')
        vi = ord(v) - ord('a')
        dist[ui][vi] = min(dist[ui][vi], c)
    for k in range(26):
        for i in range(26):
            for j in range(26):
                if dist[i][k] + dist[k][j] < dist[i][j]:
                    dist[i][j] = dist[i][k] + dist[k][j]
    total = 0
    for s_ch, t_ch in zip(source, target):
        si = ord(s_ch) - ord('a')
        ti = ord(t_ch) - ord('a')
        if dist[si][ti] >= INF:
            return -1
        total += dist[si][ti]
    return total