import sys
from typing import List

class Solution:
    def getFactors(self, n: int) -> List[List[int]]:
        res = []
        def backtrack(start: int, remain: int, path: List[int]):
            if path:
                res.append(path + [remain])
            d = start
            while d * d <= remain:
                if remain % d == 0:
                    path.append(d)
                    backtrack(d, remain // d, path)
                    path.pop()
                d += 1

        backtrack(2, n, [])
        return res

def test():
    sol = Solution()
    res12 = sorted([sorted(x) for x in sol.getFactors(12)])
    expected12 = sorted([[2, 6], [3, 4], [2, 2, 3]])
    assert res12 == expected12, "test 1 failed"
    assert sol.getFactors(1) == [], "test 2 failed"
    assert sol.getFactors(37) == [], "test 3 failed"
    print("✓ factor-combinations passed")

if __name__ == "__main__":
    test()
