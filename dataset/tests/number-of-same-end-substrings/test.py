from solution import Solution
s = Solution()
assert s.sameEndSubstringCount('abcaab', [[0, 0], [1, 4], [2, 5], [0, 5]]) == [1, 5, 5, 10]
assert s.sameEndSubstringCount('abcd', [[0, 3]]) == [4]
print('number-of-same-end-substrings passed')
