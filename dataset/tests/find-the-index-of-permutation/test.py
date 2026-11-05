from solution import Solution

s = Solution()
assert s.getPermutationIndex([1, 2]) == 0
assert s.getPermutationIndex([3, 1, 2]) == 4
assert s.getPermutationIndex([1, 2, 3]) == 0
print("All tests passed successfully.")
