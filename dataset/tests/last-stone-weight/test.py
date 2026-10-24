from typing import List
import heapq

class Solution:
    def lastStoneWeight(self, stones: List[int]) -> int:
        h = [-s for s in stones]
        heapq.heapify(h)
        while len(h) > 1:
            y = -heapq.heappop(h)
            x = -heapq.heappop(h)
            if y > x:
                heapq.heappush(h, -(y - x))
        return -h[0] if h else 0

def test():
    sol = Solution()
    assert sol.lastStoneWeight([2,7,4,1,8,1]) == 1, "test 1 failed"
    assert sol.lastStoneWeight([1]) == 1, "test 2 failed"
    print("✓ last-stone-weight passed")

if __name__ == "__main__":
    test()
