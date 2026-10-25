class Solution:
    def nearestValidPoint(self, x: int, y: int, points: list[list[int]]) -> int:
        best_dist = float('inf')
        ans = -1
        for i, (px, py) in enumerate(points):
            if px == x or py == y:
                dist = abs(x - px) + abs(y - py)
                if dist < best_dist:
                    best_dist = dist
                    ans = i
        return ans

def test():
    sol = Solution()
    assert sol.nearestValidPoint(3, 4, [[1,2],[3,1],[2,4],[2,3],[4,4]]) == 2
    assert sol.nearestValidPoint(3, 4, [[3,4]]) == 0
    assert sol.nearestValidPoint(3, 4, [[2,3]]) == -1

    print("✓ find-nearest-point-that-has-the-same-x-or-y-coordinate passed")

if __name__ == '__main__':
    test()
