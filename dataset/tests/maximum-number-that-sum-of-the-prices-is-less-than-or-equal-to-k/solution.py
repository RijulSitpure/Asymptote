class Solution:
    def findMaximumNumber(self, k: int, x: int) -> int:
        def get_sum(num: int) -> int:
            num += 1
            res = 0
            for i in range(1, 62):
                if i % x == 0:
                    group = 1 << i
                    half = 1 << (i - 1)
                    res += (num // group) * half
                    res += max(0, (num % group) - half)
            return res
        l, r = 1, 10**15
        while l < r:
            m = (l + r + 1) // 2
            if get_sum(m) <= k:
                l = m
            else:
                r = m - 1
        return l
