import sys
from typing import List

class Solution:
    def verifyPreorder(self, preorder: List[int]) -> bool:
        stack = []
        low = -float("inf")
        for x in preorder:
            if x < low:
                return False
            while stack and x > stack[-1]:
                low = stack.pop()
            stack.append(x)
        return True

def test():
    sol = Solution()
    assert sol.verifyPreorder([5, 2, 1, 3, 6]) is True, "test 1 failed"
    assert sol.verifyPreorder([5, 2, 6, 1, 3]) is False, "test 2 failed"
    print("✓ verify-preorder-sequence-in-binary-search-tree passed")

if __name__ == "__main__":
    test()
