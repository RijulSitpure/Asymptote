class Solution:
    def smallestNumber(self, n: int, t: int) -> int:
        curr = n
        while True:
            prod = 1
            for ch in str(curr):
                prod *= int(ch)
            if prod % t == 0:
                return curr
            curr += 1
