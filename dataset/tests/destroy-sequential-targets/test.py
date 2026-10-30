from solution import Solution
s = Solution()
assert s.destroyTargets([3,7,8,1,1,5], 2) == 1
assert s.destroyTargets([1,3,5,2,4,6], 2) == 1
assert s.destroyTargets([6,2,5], 100) == 2
print('All tests passed for destroy-sequential-targets!')
