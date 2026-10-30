import math

class Solution:
    def isThree(self, n: int) -> bool:
        r = int(math.isqrt(n))
        if r * r != n or r < 2:
            return False
        for d in range(2, int(math.isqrt(r)) + 1):
            if r % d == 0:
                return False
        return True

def test_is_three():
    sol = Solution()
    assert sol.isThree(2) == False
    assert sol.isThree(4) == True
    assert sol.isThree(9) == True
    assert sol.isThree(12) == False

