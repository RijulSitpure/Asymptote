import sys
from typing import List

class Solution:
    def findLongestChain(self, pairs: List[List[int]]) -> int:
        pairs.sort(key=lambda x: x[1])
        curr = -float("inf")
        ans = 0
        for a, b in pairs:
            if a > curr:
                curr = b
                ans += 1
        return ans

def test():
    sol = Solution()
    assert sol.findLongestChain([[1, 2], [2, 3], [3, 4]]) == 2, "test 1 failed"
    assert sol.findLongestChain([[1, 2], [7, 8], [4, 5]]) == 3, "test 2 failed"
    print("✓ maximum-length-of-pair-chain passed")

if __name__ == "__main__":
    test()
