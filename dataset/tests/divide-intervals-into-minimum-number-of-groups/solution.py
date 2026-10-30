import heapq

class Solution:
    def minGroups(self, intervals: list[list[int]]) -> int:
        intervals.sort()
        pq = []
        for left, right in intervals:
            if pq and pq[0] < left:
                heapq.heappop(pq)
            heapq.heappush(pq, right)
        return len(pq)
