from solution import Solution
s = Solution()
assert s.minimumOperations([2, 1, 3, 2, 1]) == 3
assert s.minimumOperations([1, 3, 2, 1, 3, 3]) == 2
assert s.minimumOperations([2, 2, 2, 2, 3, 3]) == 0
print("sorting-three-groups passed")
