from solution import Solution
s = Solution()
assert s.lexicographicallySmallestArray([1, 5, 3, 9, 8], 2) == [1, 3, 5, 8, 9]
assert s.lexicographicallySmallestArray([1, 7, 6, 18, 2, 1], 3) == [1, 6, 7, 18, 1, 2]
assert s.lexicographicallySmallestArray([1, 7, 28, 19, 10], 3) == [1, 7, 28, 19, 10]
print('make-lexicographically-smallest-array-by-swapping-elements passed')
