class Solution:
    def makeIntegerBeautiful(self, n: int, target: int) -> int:
        def digit_sum(x):
            return sum(int(c) for c in str(x))
        
        if digit_sum(n) <= target:
            return 0
        
        orig = n
        base = 10
        while digit_sum(n) > target:
            n = (n // base + 1) * base
            base *= 10
        return n - orig
