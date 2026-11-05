from solution import Solution

s = Solution()
assert s.orArray([1, 3, 7, 15]) == [3, 7, 15]
assert s.orArray([8, 4, 2]) == [12, 6]
assert s.orArray([5, 4, 9]) == [5, 13]
print('All tests passed successfully.')