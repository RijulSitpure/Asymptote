class Solution:
    def sumOfNumberAndReverse(self, num: int) -> bool:
        for x in range(num // 2, num + 1):
            rev = int(str(x)[::-1])
            if x + rev == num:
                return True
        return False
