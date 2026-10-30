class Solution:
    def longestCycle(self, edges: list[int]) -> int:
        n = len(edges)
        visited = [False] * n
        ans = -1
        for i in range(n):
            if visited[i]:
                continue
            cur = i
            step = 1
            dist = {}
            while cur != -1:
                if cur in dist:
                    ans = max(ans, step - dist[cur])
                    break
                if visited[cur]:
                    break
                visited[cur] = True
                dist[cur] = step
                step += 1
                cur = edges[cur]
        return ans
