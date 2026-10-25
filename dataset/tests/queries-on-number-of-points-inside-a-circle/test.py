class Solution:
    def countPoints(self, points: list[list[int]], queries: list[list[int]]) -> list[int]:
        ans = []
        for cx, cy, r in queries:
            r2 = r * r
            count = sum(1 for px, py in points if (px - cx)**2 + (py - cy)**2 <= r2)
            ans.append(count)
        return ans

def test():
    sol = Solution()
    pts = [[1,3],[3,3],[5,3],[2,2]]
    qs = [[2,3,1],[4,3,1],[1,1,2]]
    assert sol.countPoints(pts, qs) == [3,2,2]
    assert sol.countPoints([[1,1],[2,2],[3,3],[4,4],[5,5]], [[1,2,2],[2,2,2],[4,3,2],[4,3,3]]) == [2,3,2,4]

if __name__ == '__main__':
    test()
