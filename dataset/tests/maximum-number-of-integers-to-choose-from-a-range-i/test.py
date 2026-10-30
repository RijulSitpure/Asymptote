from solution import Solution
s = Solution()
assert s.maxCount([1,6,5], 5, 6) == 2
assert s.maxCount([1,2,3,4,5,6,7], 8, 1) == 0
assert s.maxCount([11], 7, 50) == 7
print('All tests passed for maximum-number-of-integers-to-choose-from-a-range-i!')
