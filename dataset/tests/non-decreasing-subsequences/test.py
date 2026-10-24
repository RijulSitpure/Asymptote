import sys
from typing import List

class Solution:
    def findSubsequences(self, nums: List[int]) -> List[List[int]]:
        res = []
        path = []

        def backtrack(start: int):
            if len(path) >= 2:
                res.append(list(path))
            used = set()
            for i in range(start, len(nums)):
                if nums[i] in used:
                    continue
                if not path or nums[i] >= path[-1]:
                    used.add(nums[i])
                    path.append(nums[i])
                    backtrack(i + 1)
                    path.pop()

        backtrack(0)
        return res

def test():
    sol = Solution()
    r1 = sol.findSubsequences([4, 6, 7, 7])
    expected1 = sorted([[4,6],[4,6,7],[4,6,7,7],[4,7],[4,7,7],[6,7],[6,7,7],[7,7]])
    assert sorted(r1) == expected1, "test 1 failed"
    r2 = sol.findSubsequences([4, 4, 3, 2, 1])
    assert r2 == [[4, 4]], "test 2 failed"
    print("✓ non-decreasing-subsequences passed")

if __name__ == "__main__":
    test()
