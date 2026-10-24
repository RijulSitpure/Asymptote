import sys
from typing import List

class Solution:
    def sortTransformedArray(self, nums: List[int], a: int, b: int, c: int) -> List[int]:
        def f(x):
            return a * x * x + b * x + c
        n = len(nums)
        res = [0] * n
        l, r = 0, n - 1
        if a >= 0:
            idx = n - 1
            while l <= r:
                vl, vr = f(nums[l]), f(nums[r])
                if vl >= vr:
                    res[idx] = vl
                    l += 1
                else:
                    res[idx] = vr
                    r -= 1
                idx -= 1
        else:
            idx = 0
            while l <= r:
                vl, vr = f(nums[l]), f(nums[r])
                if vl <= vr:
                    res[idx] = vl
                    l += 1
                else:
                    res[idx] = vr
                    r -= 1
                idx += 1
        return res

def test():
    sol = Solution()
    assert sol.sortTransformedArray([-4,-2,2,4], 1, 3, 5) == [3,9,15,33], "test 1 failed"
    assert sol.sortTransformedArray([-4,-2,2,4], -1, 3, 5) == [-23,-5,1,7], "test 2 failed"
    print("✓ sort-transformed-array passed")

if __name__ == "__main__":
    test()
