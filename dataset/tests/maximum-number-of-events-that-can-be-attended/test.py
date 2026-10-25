import heapq

class Solution:
    def maxEvents(self, events: list[list[int]]) -> int:
        events.sort()
        total_days = max(end for _, end in events)
        min_heap = []
        event_idx = 0
        n = len(events)
        attended = 0
        for day in range(1, total_days + 1):
            while event_idx < n and events[event_idx][0] == day:
                heapq.heappush(min_heap, events[event_idx][1])
                event_idx += 1
            while min_heap and min_heap[0] < day:
                heapq.heappop(min_heap)
            if min_heap:
                heapq.heappop(min_heap)
                attended += 1
            if event_idx >= n and not min_heap:
                break
        return attended

def test():
    sol = Solution()
    assert sol.maxEvents([[1,2],[2,3],[3,4]]) == 3, "test 1 failed"
    assert sol.maxEvents([[1,2],[2,3],[3,4],[1,2]]) == 4, "test 2 failed"
    print("✓ maximum-number-of-events-that-can-be-attended passed")

if __name__ == "__main__":
    test()
