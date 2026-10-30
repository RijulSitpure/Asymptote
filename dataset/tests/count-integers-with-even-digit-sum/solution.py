class Solution:
    def countEven(self, num: int) -> int:
        s = sum(int(c) for c in str(num))
        return num // 2 if s % 2 == 0 else (num - 1) // 2
