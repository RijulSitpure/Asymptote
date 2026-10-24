import bisect
from typing import List

class Solution:
    def findRightInterval(self, intervals: List[List[int]]) -> List[int]:
        starts = sorted([(iv[0], i) for i, iv in enumerate(intervals)])
        start_vals = [s[0] for s in starts]
        res = []

        for start, end in intervals:
            idx = bisect.bisect_left(start_vals, end)
            if idx < len(starts):
                res.append(starts[idx][1])
            else:
                res.append(-1)

        return res

def test():
    sol = Solution()
    assert sol.findRightInterval([[1,2]]) == [-1], "test 1 failed"
    assert sol.findRightInterval([[3,4],[2,3],[1,2]]) == [-1,0,1], "test 2 failed"
    assert sol.findRightInterval([[1,4],[2,3],[3,4]]) == [-1,2,-1], "test 3 failed"
    print("✓ find-right-interval passed")

if __name__ == "__main__":
    test()
