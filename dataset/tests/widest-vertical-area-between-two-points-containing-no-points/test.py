class Solution:
    def maxWidthOfVerticalArea(self, points: list[list[int]]) -> int:
        xs = sorted(p[0] for p in points)
        return max(xs[i] - xs[i - 1] for i in range(1, len(xs)))

def test():
    sol = Solution()
    assert sol.maxWidthOfVerticalArea([[8,7],[9,9],[7,4],[9,7]]) == 1
    assert sol.maxWidthOfVerticalArea([[3,1],[9,0],[1,0],[1,4],[5,3],[8,8]]) == 3

    print("✓ widest-vertical-area-between-two-points-containing-no-points passed")

if __name__ == '__main__':
    test()
