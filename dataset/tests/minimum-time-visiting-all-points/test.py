class Solution:
    def minTimeToVisitAllPoints(self, points: list[list[int]]) -> int:
        ans = 0
        for i in range(1, len(points)):
            dx = abs(points[i][0] - points[i - 1][0])
            dy = abs(points[i][1] - points[i - 1][1])
            ans += max(dx, dy)
        return ans

def test():
    sol = Solution()
    assert sol.minTimeToVisitAllPoints([[1,1],[3,4],[-1,0]]) == 7, "test 1 failed"
    assert sol.minTimeToVisitAllPoints([[3,2],[-2,2]]) == 5, "test 2 failed"
    print("✓ minimum-time-visiting-all-points passed")

if __name__ == "__main__":
    test()
