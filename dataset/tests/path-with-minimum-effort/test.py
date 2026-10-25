import heapq

class Solution:
    def minimumEffortPath(self, heights: list[list[int]]) -> int:
        m, n = len(heights), len(heights[0])
        dist = [[float("inf")] * n for _ in range(m)]
        dist[0][0] = 0
        pq = [(0, 0, 0)]
        while pq:
            d, r, c = heapq.heappop(pq)
            if r == m - 1 and c == n - 1:
                return d
            if d > dist[r][c]:
                continue
            for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                nr, nc = r + dr, c + dc
                if 0 <= nr < m and 0 <= nc < n:
                    cost = max(d, abs(heights[r][c] - heights[nr][nc]))
                    if cost < dist[nr][nc]:
                        dist[nr][nc] = cost
                        heapq.heappush(pq, (cost, nr, nc))
        return dist[m - 1][n - 1]

def test():
    sol = Solution()
    assert sol.minimumEffortPath([[1,2,2],[3,8,2],[5,3,5]]) == 2
    assert sol.minimumEffortPath([[1,2,3],[3,8,4],[5,3,5]]) == 1
    assert sol.minimumEffortPath([[1,2,1,1,1],[1,2,1,2,1],[1,2,1,2,1],[1,2,1,2,1],[1,1,1,2,1]]) == 0

    print("✓ path-with-minimum-effort passed")

if __name__ == '__main__':
    test()
