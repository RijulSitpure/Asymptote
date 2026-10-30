import math

class Solution:
    def getMinDistSum(self, positions: list[list[int]]) -> float:
        def dist_sum(x, y):
            return sum(math.hypot(x - px, y - py) for px, py in positions)
        x = sum(p[0] for p in positions) / len(positions)
        y = sum(p[1] for p in positions) / len(positions)
        step = 50.0
        eps = 1e-7
        while step > eps:
            improved = False
            for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                nx, ny = x + dx * step, y + dy * step
                if dist_sum(nx, ny) < dist_sum(x, y):
                    x, y = nx, ny
                    improved = True
                    break
            if not improved:
                step /= 2.0
        return dist_sum(x, y)

sol = Solution()
assert abs(sol.getMinDistSum([[0,1],[1,0],[1,2],[2,1]]) - 4.0) < 1e-4
assert abs(sol.getMinDistSum([[1,1],[3,3]]) - 2.82843) < 1e-4
print("All tests passed successfully.")
