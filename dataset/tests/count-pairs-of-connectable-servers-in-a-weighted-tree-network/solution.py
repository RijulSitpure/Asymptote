class Solution:
    def countPairsOfConnectableServers(self, edges: list[list[int]], signalSpeed: int) -> list[int]:
        from collections import defaultdict
        graph = defaultdict(list)
        n = len(edges) + 1
        for u, v, w in edges:
            graph[u].append((v, w))
            graph[v].append((u, w))
        def dfs(node, parent, dist):
            cnt = 1 if dist % signalSpeed == 0 else 0
            for nxt, w in graph[node]:
                if nxt != parent:
                    cnt += dfs(nxt, node, dist + w)
            return cnt
        ans = [0] * n
        for c in range(n):
            branch_counts = []
            for nxt, w in graph[c]:
                cnt = dfs(nxt, c, w)
                if cnt > 0:
                    branch_counts.append(cnt)
            total_sum = 0
            pairs = 0
            for cnt in branch_counts:
                pairs += total_sum * cnt
                total_sum += cnt
            ans[c] = pairs
        return ans
