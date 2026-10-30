import math
import heapq

class Solution:
    def pickGifts(self, gifts: list[int], k: int) -> int:
        pq = [-x for x in gifts]
        heapq.heapify(pq)
        for _ in range(k):
            x = -heapq.heappop(pq)
            heapq.heappush(pq, -int(math.isqrt(x)))
        return -sum(pq)
