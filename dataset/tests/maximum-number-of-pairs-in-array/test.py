from solution import Solution
s = Solution()
assert s.numberOfPairs([1,3,2,1,3,2,2]) == [3, 1]
assert s.numberOfPairs([1,1]) == [1, 0]
assert s.numberOfPairs([0]) == [0, 1]
print("All tests passed for maximum-number-of-pairs-in-array!")
