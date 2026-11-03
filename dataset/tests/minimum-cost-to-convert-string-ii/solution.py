class Solution:
    def minimumCost(self, source: str, target: str, original: list[str], changed: list[str], cost: list[int]) -> int:
        INF = float('inf')
        word_id = {}
        for w in original + changed:
            if w not in word_id:
                word_id[w] = len(word_id)
        m = len(word_id)
        dist = [[INF] * m for _ in range(m)]
        for i in range(m):
            dist[i][i] = 0
        for u, v, w in zip(original, changed, cost):
            uid, vid = word_id[u], word_id[v]
            dist[uid][vid] = min(dist[uid][vid], w)
        for k in range(m):
            for i in range(m):
                for j in range(m):
                    if dist[i][k] + dist[k][j] < dist[i][j]:
                        dist[i][j] = dist[i][k] + dist[k][j]
        root = {}
        for w, wid in word_id.items():
            node = root
            for ch in w:
                node = node.setdefault(ch, {})
            node['#'] = wid
        n = len(source)
        dp = [INF] * (n + 1)
        dp[0] = 0
        for i in range(n):
            if dp[i] == INF:
                continue
            if source[i] == target[i]:
                dp[i + 1] = min(dp[i + 1], dp[i])
            u_node = root
            v_node = root
            for j in range(i, n):
                if source[j] not in u_node or target[j] not in v_node:
                    break
                u_node = u_node[source[j]]
                v_node = v_node[target[j]]
                if '#' in u_node and '#' in v_node:
                    uid = u_node['#']
                    vid = v_node['#']
                    if dist[uid][vid] < INF:
                        dp[j + 1] = min(dp[j + 1], dp[i] + dist[uid][vid])
        return dp[n] if dp[n] < INF else -1
