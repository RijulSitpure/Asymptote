from typing import List
from collections import defaultdict
import heapq

class Solution:
    def minMoves(self, matrix: List[str]) -> int:
        if matrix[-1][-1] == "#":
            return -1
        m, n = len(matrix), len(matrix[0])
        teleports = defaultdict(list)
        for i in range(m):
            for j in range(n):
                c = matrix[i][j]
                if c != "." and c != "#":
                    teleports[c].append((i, j))

        dist = [[float("inf")] * n for _ in range(m)]
        dist[0][0] = 0
        heap = [(0, 0, 0)]
        seen_t = set()
        dirs = [(0, 1), (1, 0), (0, -1), (-1, 0)]

        while heap:
            d, i, j = heapq.heappop(heap)
            if i == m - 1 and j == n - 1:
                return d
            if d > dist[i][j]:
                continue
            c = matrix[i][j]
            if "A" <= c <= "Z" and c not in seen_t:
                seen_t.add(c)
                for x, y in teleports[c]:
                    if d < dist[x][y]:
                        dist[x][y] = d
                        heapq.heappush(heap, (d, x, y))
            for dx, dy in dirs:
                x, y = i + dx, j + dy
                if 0 <= x < m and 0 <= y < n and matrix[x][y] != "#":
                    if d + 1 < dist[x][y]:
                        dist[x][y] = d + 1
                        heapq.heappush(heap, (d + 1, x, y))
        return -1

def run_tests():
    s = Solution()
    res = s.minMoves([".A", "A."])
    assert res == 2, f"Expected 2, got {res}"
    print("3552 grid-teleportation-traversal PASSED")

if __name__ == "__main__":
    run_tests()
