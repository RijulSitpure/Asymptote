import sys
from typing import List

class Solution:
    def canAttendMeetings(self, intervals: List[List[int]]) -> bool:
        intervals.sort(key=lambda x: x[0])
        for i in range(len(intervals) - 1):
            if intervals[i][1] > intervals[i + 1][0]:
                return False
        return True

def test():
    sol = Solution()
    assert sol.canAttendMeetings([[0,30],[5,10],[15,20]]) is False, "test 1 failed"
    assert sol.canAttendMeetings([[7,10],[2,4]]) is True, "test 2 failed"
    assert sol.canAttendMeetings([]) is True, "test 3 failed"
    print("✓ meeting-rooms passed")

if __name__ == "__main__":
    test()
