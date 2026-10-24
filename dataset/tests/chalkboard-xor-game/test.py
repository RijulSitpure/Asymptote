import functools
import operator
from typing import List

class Solution:
    def xorGame(self, nums: List[int]) -> bool:
        x = functools.reduce(operator.xor, nums)
        return x == 0 or len(nums) % 2 == 0

def test():
    sol = Solution()
    assert sol.xorGame([1, 1, 2]) is False, "test 1 failed"
    assert sol.xorGame([0, 1]) is True, "test 2 failed"
    assert sol.xorGame([1, 2, 3]) is True, "test 3 failed"
    print("✓ chalkboard-xor-game passed")

if __name__ == "__main__":
    test()
