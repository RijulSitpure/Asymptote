from solution import Solution
s = Solution()
assert s.bestClosingTime('YYNY') == 2
assert s.bestClosingTime('NNNNN') == 0
assert s.bestClosingTime('YYYY') == 4
print('All tests passed for minimum-penalty-for-a-shop!')
