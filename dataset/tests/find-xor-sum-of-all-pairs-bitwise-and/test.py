from functools import reduce
from operator import xor

class Solution:
    def getXORSum(self, arr1: list[int], arr2: list[int]) -> int:
        xor1 = reduce(xor, arr1)
        xor2 = reduce(xor, arr2)
        return xor1 & xor2

def test():
    sol = Solution()
    assert sol.getXORSum([1,2,3], [6,5]) == 0
    assert sol.getXORSum([12], [4]) == 4

if __name__ == '__main__':
    test()
