from typing import List

class Solution:
    def intervalIntersection(self, firstList: List[List[int]], secondList: List[List[int]]) -> List[List[int]]:
        i, j = 0, 0
        res = []
        while i < len(firstList) and j < len(secondList):
            lo = max(firstList[i][0], secondList[j][0])
            hi = min(firstList[i][1], secondList[j][1])
            if lo <= hi:
                res.append([lo, hi])
            if firstList[i][1] < secondList[j][1]:
                i += 1
            else:
                j += 1
        return res

def test():
    sol = Solution()
    f1 = [[0,2],[5,10],[13,23],[24,25]]
    s1 = [[1,5],[8,12],[15,24],[25,26]]
    expected1 = [[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]]
    assert sol.intervalIntersection(f1, s1) == expected1, "test 1 failed"
    f2 = [[1,3],[5,9]]
    s2 = []
    assert sol.intervalIntersection(f2, s2) == [], "test 2 failed"
    print("✓ interval-list-intersections passed")

if __name__ == "__main__":
    test()
