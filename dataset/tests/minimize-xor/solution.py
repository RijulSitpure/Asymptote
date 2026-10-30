class Solution:
    def minimizeXor(self, num1: int, num2: int) -> int:
        k = bin(num2).count('1')
        res = 0
        for b in range(30, -1, -1):
            if (num1 >> b) & 1 and k > 0:
                res |= (1 << b)
                k -= 1
        for b in range(31):
            if k > 0 and not ((res >> b) & 1):
                res |= (1 << b)
                k -= 1
        return res
