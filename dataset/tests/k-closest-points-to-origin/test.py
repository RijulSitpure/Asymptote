from typing import List

class Solution:
    def kClosest(self, points: List[List[int]], k: int) -> List[List[int]]:
        points.sort(key=lambda p: p[0] ** 2 + p[1] ** 2)
        return points[:k]

def test():
    sol = Solution()
    p1 = [[1,3],[-2,2]]
    assert sol.kClosest(p1, 1) == [[-2,2]], "test 1 failed"
    p2 = [[3,3],[5,-1],[-2,4]]
    res = sol.kClosest(p2, 2)
    assert sorted(res) == sorted([[3,3],[-2,4]]), "test 2 failed"
    print("✓ k-closest-points-to-origin passed")

if __name__ == "__main__":
    test()
