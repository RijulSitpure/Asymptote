from solution import Solution
s = Solution()
assert s.semiOrderedPermutation([2, 1, 4, 3]) == 2
assert s.semiOrderedPermutation([2, 4, 1, 3]) == 3
assert s.semiOrderedPermutation([1, 3, 4, 2, 5]) == 0
print("All tests passed for semi-ordered-permutation")
