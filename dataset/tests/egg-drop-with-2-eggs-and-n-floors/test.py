import math

class Solution:
    def twoEggDrop(self, n: int) -> int:
        return math.ceil((-1 + math.sqrt(1 + 8 * n)) / 2)

def test():
    sol = Solution()
    assert sol.twoEggDrop(2) == 2
    assert sol.twoEggDrop(100) == 14

if __name__ == '__main__':
    test()
