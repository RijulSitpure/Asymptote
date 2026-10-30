from solution import Solution
s = Solution()
assert s.substringXorQueries('101101', [[0, 5], [1, 2]]) == [[0, 2], [2, 3]]
assert s.substringXorQueries('0101', [[12, 8]]) == [[-1, -1]]
assert s.substringXorQueries('1', [[4, 5]]) == [[0, 0]]
print('All tests passed for substring-xor-queries!')
