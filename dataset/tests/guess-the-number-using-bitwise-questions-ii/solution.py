# Definition of commonBits API.
# def commonBits(num: int) -> int:

class Solution:
    def findNumber(self) -> int:
        ans = 0
        for i in range(30):
            c1 = commonBits(1 << i)
            c2 = commonBits(1 << i)
            if c1 < c2:
                ans |= (1 << i)
        return ans
