class Solution:
    def resultsArray(self, queries: list[list[int]], k: int) -> list[int]:
        import heapq
        # Max-heap storing k smallest Manhattan distances (as negative values)
        pq = []
        ans = []
        for x, y in queries:
            d = abs(x) + abs(y)
            if len(pq) < k:
                heapq.heappush(pq, -d)
            elif d < -pq[0]:
                heapq.heappushpop(pq, -d)
            ans.append(-pq[0] if len(pq) == k else -1)
        return ans
