import sys
import heapq
from typing import List

class Solution:
    def getSkyline(self, buildings: List[List[int]]) -> List[List[int]]:
        events = []
        for L, R, H in buildings:
            events.append((L, -H, R))
            events.append((R, 0, 0))
        events.sort()

        res = [[0, 0]]
        heap = [(0, float("inf"))]

        for x, neg_h, r in events:
            if neg_h != 0:
                heapq.heappush(heap, (neg_h, r))
            while heap[0][1] <= x:
                heapq.heappop(heap)
            max_h = -heap[0][0]
            if res[-1][1] != max_h:
                res.append([x, max_h])

        return res[1:]

def test():
    sol = Solution()
    b1 = [[2,9,10],[3,7,15],[5,12,12],[15,20,10],[19,24,8]]
    expected1 = [[2,10],[3,15],[7,12],[12,0],[15,10],[20,8],[24,0]]
    assert sol.getSkyline(b1) == expected1, "test 1 failed"
    b2 = [[0,2,3],[2,5,3]]
    assert sol.getSkyline(b2) == [[0,3],[5,0]], "test 2 failed"
    print("✓ the-skyline-problem passed")

if __name__ == "__main__":
    test()
