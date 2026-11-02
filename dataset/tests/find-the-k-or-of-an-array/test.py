from solution import Solution
s = Solution()
assert s.findKOr([7, 12, 9, 8, 9, 15], 4) == 9
assert s.findKOr([2, 12, 1, 11, 4, 5], 6) == 0
assert s.findKOr([10, 8, 5, 9, 11, 6, 8], 1) == 15
print('find-the-k-or-of-an-array passed')
