class Solution:
    def findNumber(self) -> int:
        ans = 0
        for i in range(30):
            if commonSetBits(1 << i) > 0:
                ans |= (1 << i)
        return ans
