import sys
from typing import List

class Solution:
    def minMeetingRooms(self, intervals: List[List[int]]) -> int:
        starts = sorted(x[0] for x in intervals)
        ends = sorted(x[1] for x in intervals)
        rooms = 0
        end_idx = 0
        for s in starts:
            if s < ends[end_idx]:
                rooms += 1
            else:
                end_idx += 1
        return rooms

def test():
    sol = Solution()
    assert sol.minMeetingRooms([[0,30],[5,10],[15,20]]) == 2, "test 1 failed"
    assert sol.minMeetingRooms([[7,10],[2,4]]) == 1, "test 2 failed"
    print("✓ meeting-rooms-ii passed")

if __name__ == "__main__":
    test()
