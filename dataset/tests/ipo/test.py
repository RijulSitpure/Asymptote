import sys
import heapq
from typing import List

class Solution:
    def findMaximizedCapital(self, k: int, w: int, profits: List[int], capital: List[int]) -> int:
        projects = sorted(zip(capital, profits))
        n = len(projects)
        idx = 0
        max_heap = []

        for _ in range(k):
            while idx < n and projects[idx][0] <= w:
                heapq.heappush(max_heap, -projects[idx][1])
                idx += 1
            if not max_heap:
                break
            w += -heapq.heappop(max_heap)

        return w

def test():
    sol = Solution()
    assert sol.findMaximizedCapital(2, 0, [1, 2, 3], [0, 1, 1]) == 4, "test 1 failed"
    assert sol.findMaximizedCapital(3, 0, [1, 2, 3], [0, 1, 2]) == 6, "test 2 failed"
    print("✓ ipo passed")

if __name__ == "__main__":
    test()
