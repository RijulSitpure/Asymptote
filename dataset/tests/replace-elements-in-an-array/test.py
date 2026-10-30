from solution import Solution
s = Solution()
assert s.arrayChange([1,2,4,6], [[1,3],[4,7],[6,1]]) == [3,2,7,1]
assert s.arrayChange([1,2], [[1,3],[2,1],[3,2]]) == [2,1]
print("All tests passed for replace-elements-in-an-array!")
