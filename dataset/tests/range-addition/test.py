import sys
from typing import List

class Solution:
    def getModifiedArray(self, length: int, updates: List[List[int]]) -> List[int]:
        arr = [0] * (length + 1)
        for s, e, inc in updates:
            arr[s] += inc
            arr[e + 1] -= inc
        res = [0] * length
        running = 0
        for i in range(length):
            running += arr[i]
            res[i] = running
        return res

def test():
    sol = Solution()
    assert sol.getModifiedArray(5, [[1,3,2],[2,4,3],[0,2,-2]]) == [-2,0,3,5,3], "test 1 failed"
    print("✓ range-addition passed")

if __name__ == "__main__":
    test()
