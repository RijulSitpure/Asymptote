from solution import Solution
s = Solution()
assert s.makeSimilar([8,12,6], [2,14,10]) == 2
assert s.makeSimilar([1,2,5], [4,1,3]) == 1
assert s.makeSimilar([1,1,1,1,1], [1,1,1,1,1]) == 0
print('All tests passed for minimum-number-of-operations-to-make-arrays-similar!')
