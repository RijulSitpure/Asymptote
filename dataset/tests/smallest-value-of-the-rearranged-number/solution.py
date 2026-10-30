class Solution:
    def smallestNumber(self, num: int) -> int:
        if num == 0:
            return 0
        if num > 0:
            digits = sorted(str(num))
            idx = 0
            while digits[idx] == '0':
                idx += 1
            digits[0], digits[idx] = digits[idx], digits[0]
            return int("".join(digits))
        else:
            digits = sorted(str(-num), reverse=True)
            return -int("".join(digits))
