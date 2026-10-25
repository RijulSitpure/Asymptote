from collections import deque

class Solution:
    def highestPeak(self, isWater: list[list[int]]) -> list[list[int]]:
        m, n = len(isWater), len(isWater[0])
        height = [[-1] * n for _ in range(m)]
        q = deque()

        for r in range(m):
            for c in range(n):
                if isWater[r][c] == 1:
                    height[r][c] = 0
                    q.append((r, c))

        dirs = [(-1, 0), (1, 0), (0, -1), (0, 1)]
        while q:
            r, c = q.popleft()
            for dr, dc in dirs:
                nr, nc = r + dr, c + dc
                if 0 <= nr < m and 0 <= nc < n and height[nr][nc] == -1:
                    height[nr][nc] = height[r][c] + 1
                    q.append((nr, nc))

        return height

def test():
    sol = Solution()
    assert sol.highestPeak([[0,1],[0,0]]) == [[1,0],[2,1]]
    assert sol.highestPeak([[0,0,1],[1,0,0],[0,0,0]]) == [[1,1,0],[0,1,1],[1,2,2]]

    print("✓ map-of-highest-peak passed")

if __name__ == '__main__':
    test()
