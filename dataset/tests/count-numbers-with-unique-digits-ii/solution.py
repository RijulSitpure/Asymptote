class Solution:
    def numberCount(self, a: int, b: int) -> int:
        return sum(1 for x in range(a, b + 1) if len(str(x)) == len(set(str(x))))
