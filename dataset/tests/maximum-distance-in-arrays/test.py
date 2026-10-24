import sys
from typing import List

class Solution:
    def maxDistance(self, arrays: List[List[int]]) -> int:
        res = 0
        min_val = arrays[0][0]
        max_val = arrays[0][-1]
        for i in range(1, len(arrays)):
            arr = arrays[i]
            res = max(res, abs(arr[-1] - min_val), abs(max_val - arr[0]))
            min_val = min(min_val, arr[0])
            max_val = max(max_val, arr[-1])
        return res

def test():
    sol = Solution()
    assert sol.maxDistance([[1, 2, 3], [4, 5], [1, 2, 3]]) == 4, "test 1 failed"
    assert sol.maxDistance([[1], [1]]) == 0, "test 2 failed"
    print("✓ maximum-distance-in-arrays passed")

if __name__ == "__main__":
    test()
