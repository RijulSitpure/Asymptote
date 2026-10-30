from solution import Solution
s = Solution()
assert s.beautifulPair([1, 2, 3, 2, 4], [2, 3, 1, 2, 3]) == [0, 3]
assert s.beautifulPair([1, 2, 3], [4, 5, 6]) == [0, 1]
print('All tests passed for beautiful-pairs!')
