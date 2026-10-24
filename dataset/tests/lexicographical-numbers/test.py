import sys
from typing import List

class Solution:
    def lexicalOrder(self, n: int) -> List[int]:
        res = []
        curr = 1
        for _ in range(n):
            res.append(curr)
            if curr * 10 <= n:
                curr *= 10
            else:
                while curr % 10 == 9 or curr >= n:
                    curr //= 10
                curr += 1
        return res

def test():
    sol = Solution()
    assert sol.lexicalOrder(13) == [1, 10, 11, 12, 13, 2, 3, 4, 5, 6, 7, 8, 9], "test 1 failed"
    assert sol.lexicalOrder(2) == [1, 2], "test 2 failed"
    print("✓ lexicographical-numbers passed")

if __name__ == "__main__":
    test()
