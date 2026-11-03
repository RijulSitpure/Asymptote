from solution import Solution
s = Solution()
assert s.minOperations([1, 2, 7], [4, 5, 3]) == 1
assert s.minOperations([2, 3, 4, 5, 9], [8, 8, 4, 4, 4]) == 2
assert s.minOperations([1, 5, 4], [2, 5, 3]) == -1
print('minimum-operations-to-maximize-last-elements-in-arrays passed')
