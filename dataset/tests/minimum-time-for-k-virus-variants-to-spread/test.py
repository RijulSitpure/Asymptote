class Solution:
    def minDayskVariants(self, points: list[list[int]], k: int) -> int:
        ans = float("inf")
        for x in range(1, 101):
            for y in range(1, 101):
                dists = [abs(x - px) + abs(y - py) for px, py in points]
                dists.sort()
                ans = min(ans, dists[k - 1])
        return ans

def test_min_days():
    sol = Solution()
    assert sol.minDayskVariants([[1,1],[6,1]], 2) == 3
    assert sol.minDayskVariants([[3,3],[1,2],[9,2]], 2) == 2

