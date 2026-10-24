import heapq
from typing import List

class Solution:
    def scheduleCourse(self, courses: List[List[int]]) -> int:
        courses.sort(key=lambda x: x[1])
        heap = []
        total_time = 0

        for dur, last in courses:
            heapq.heappush(heap, -dur)
            total_time += dur
            if total_time > last:
                total_time += heapq.heappop(heap)

        return len(heap)

def test():
    sol = Solution()
    assert sol.scheduleCourse([[100,200],[200,1300],[1000,1250],[2000,3200]]) == 3, "test 1 failed"
    assert sol.scheduleCourse([[1,2]]) == 1, "test 2 failed"
    assert sol.scheduleCourse([[3,2],[4,3]]) == 0, "test 3 failed"
    print("✓ course-schedule-iii passed")

if __name__ == "__main__":
    test()
