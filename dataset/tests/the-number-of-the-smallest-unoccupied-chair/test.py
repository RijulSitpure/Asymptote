import heapq

class Solution:
    def smallestChair(self, times: list[list[int]], targetFriend: int) -> int:
        events = []
        for i, (arr, leave) in enumerate(times):
            events.append((arr, leave, i))
        events.sort()
        
        available_chairs = list(range(len(times)))
        heapq.heapify(available_chairs)
        leaving_heap = []
        
        for arr, leave, i in events:
            while leaving_heap and leaving_heap[0][0] <= arr:
                _, chair = heapq.heappop(leaving_heap)
                heapq.heappush(available_chairs, chair)
                
            assigned_chair = heapq.heappop(available_chairs)
            if i == targetFriend:
                return assigned_chair
            heapq.heappush(leaving_heap, (leave, assigned_chair))
        return -1

def test_smallest_chair():
    sol = Solution()
    assert sol.smallestChair([[1,4],[2,3],[4,6]], 1) == 1
    assert sol.smallestChair([[3,10],[1,5],[2,6]], 0) == 2

