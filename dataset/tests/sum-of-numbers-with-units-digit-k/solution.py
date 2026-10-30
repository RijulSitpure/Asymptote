class Solution:
    def minimumNumbers(self, num: int, k: int) -> int:
        if num == 0:
            return 0
        for s in range(1, 11):
            if s * k <= num and (num - s * k) % 10 == 0:
                return s
        return -1
