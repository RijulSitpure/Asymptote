from solution import Solution
s = Solution()
assert s.minimumTotalCost([1,2,3,4,5], [1,2,3,4,5]) == 10
assert s.minimumTotalCost([2,2,5,2,3,6,3], [4,3,5,1,2,3,1]) == 2
assert s.minimumTotalCost([1,2,2], [1,2,2]) == -1
print('All tests passed for minimum-total-cost-to-make-arrays-unequal!')
