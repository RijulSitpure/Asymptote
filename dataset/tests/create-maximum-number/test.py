import sys
from typing import List

class Solution:
    def maxNumber(self, nums1: List[int], nums2: List[int], k: int) -> List[int]:
        def max_single(nums: List[int], count: int) -> List[int]:
            stack = []
            drop = len(nums) - count
            for x in nums:
                while drop > 0 and stack and stack[-1] < x:
                    stack.pop()
                    drop -= 1
                stack.append(x)
            return stack[:count]

        def merge(a: List[int], b: List[int]) -> List[int]:
            res = []
            i, j = 0, 0
            while i < len(a) or j < len(b):
                if a[i:] > b[j:]:
                    res.append(a[i])
                    i += 1
                else:
                    res.append(b[j])
                    j += 1
            return res

        best = []
        for i in range(max(0, k - len(nums2)), min(k, len(nums1)) + 1):
            cand = merge(max_single(nums1, i), max_single(nums2, k - i))
            if cand > best:
                best = cand
        return best

def test():
    sol = Solution()
    assert sol.maxNumber([3, 4, 6, 5], [9, 1, 2, 5, 8, 3], 5) == [9, 8, 6, 5, 3], "test 1 failed"
    assert sol.maxNumber([6, 7], [6, 0, 4], 5) == [6, 7, 6, 0, 4], "test 2 failed"
    print("✓ create-maximum-number passed")

if __name__ == "__main__":
    test()
