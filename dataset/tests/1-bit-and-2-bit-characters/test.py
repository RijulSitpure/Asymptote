import sys
from typing import List

class Solution:
    def isOneBitCharacter(self, bits: List[int]) -> bool:
        i = 0
        n = len(bits)
        while i < n - 1:
            if bits[i] == 1:
                i += 2
            else:
                i += 1
        return i == n - 1

def test():
    sol = Solution()
    assert sol.isOneBitCharacter([1, 0, 0]) is True, "test 1 failed"
    assert sol.isOneBitCharacter([1, 1, 1, 0]) is False, "test 2 failed"
    print("✓ 1-bit-and-2-bit-characters passed")

if __name__ == "__main__":
    test()
