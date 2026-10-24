import sys
from typing import List

class Solution:
    def findPermutation(self, s: str) -> List[int]:
        res = list(range(1, len(s) + 2))
        i = 0
        n = len(s)
        while i < n:
            if s[i] == "D":
                start = i
                while i < n and s[i] == "D":
                    i += 1
                res[start:i + 1] = reversed(res[start:i + 1])
            else:
                i += 1
        return res

def test():
    sol = Solution()
    assert sol.findPermutation("I") == [1, 2], "test 1 failed"
    assert sol.findPermutation("DI") == [2, 1, 3], "test 2 failed"
    print("✓ find-permutation passed")

if __name__ == "__main__":
    test()
