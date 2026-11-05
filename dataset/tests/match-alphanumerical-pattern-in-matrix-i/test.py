from solution import Solution

s = Solution()
assert s.findPattern([[1,2,2],[2,2,3],[2,3,3]], ["ab","bb"]) == [0, 0]
assert s.findPattern([[1,1,2],[3,3,4],[6,6,6]], ["ab","66"]) == [1, 1]
assert s.findPattern([[1,1,2],[3,3,4],[6,6,6]], ["99","99"]) == [-1, -1]
print("match-alphanumerical-pattern-in-matrix-i tests passed!")
