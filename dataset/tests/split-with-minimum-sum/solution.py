class Solution:
    def splitNum(self, num: int) -> int:
        digits = sorted(str(num))
        num1 = "".join(digits[::2])
        num2 = "".join(digits[1::2])
        return int(num1) + int(num2)
