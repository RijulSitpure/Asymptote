import heapq

class Solution:
    def minInterval(self, intervals: list[list[int]], queries: list[int]) -> list[int]:
        intervals.sort()
        sorted_queries = sorted([(q, i) for i, q in enumerate(queries)])

        pq = []
        ans = [-1] * len(queries)
        idx = 0
        n = len(intervals)

        for q, orig_idx in sorted_queries:
            while idx < n and intervals[idx][0] <= q:
                l, r = intervals[idx]
                heapq.heappush(pq, (r - l + 1, r))
                idx += 1

            while pq and pq[0][1] < q:
                heapq.heappop(pq)

            if pq:
                ans[orig_idx] = pq[0][0]

        return ans

def test():
    sol = Solution()
    assert sol.minInterval([[1,4],[2,4],[3,6],[4,4]], [2,3,4,5]) == [3,3,1,4]
    assert sol.minInterval([[2,3],[2,5],[1,8],[20,25]], [2,19,5,22]) == [2,-1,4,6]

if __name__ == '__main__':
    test()
