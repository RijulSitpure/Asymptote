from collections import deque

class Solution:
    def findDiameterEndpoints(self, n: int, edges: list[list[int]]) -> list[int]:
        if n == 1:
            return [0, 0]
        
        adj = [[] for _ in range(n)]
        for u, v in edges:
            adj[u].append(v)
            adj[v].append(u)
        
        def bfs(start: int) -> tuple[int, list[int]]:
            dist = [-1] * n
            dist[start] = 0
            q = deque([start])
            farthest = start
            while q:
                curr = q.popleft()
                if dist[curr] > dist[farthest] or (dist[curr] == dist[farthest] and curr < farthest):
                    farthest = curr
                for nxt in adj[curr]:
                    if dist[nxt] == -1:
                        dist[nxt] = dist[curr] + 1
                        q.append(nxt)
            return farthest, dist
        
        u, _ = bfs(0)
        v, _ = bfs(u)
        return sorted([u, v])

def run_tests():
    sol = Solution()
    assert sol.findDiameterEndpoints(3, [[0, 1], [1, 2]]) == [0, 2]
    assert sol.findDiameterEndpoints(4, [[0, 1], [1, 2], [2, 3]]) == [0, 3]
    print("All tests passed for 3787.")

if __name__ == "__main__":
    run_tests()
