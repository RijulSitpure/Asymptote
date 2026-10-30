from solution import Solution
s = Solution()
assert s.findDifference([1,2,3], [2,4,6]) == [[1,3],[4,6]]
assert s.findDifference([1,2,3,3], [1,1,2,2]) == [[3],[]]
print("All tests passed for find-the-difference-of-two-arrays!")
