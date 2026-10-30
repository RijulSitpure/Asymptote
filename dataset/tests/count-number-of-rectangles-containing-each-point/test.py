from solution import Solution
s = Solution()
assert s.countRectangles([[1,2],[2,3],[2,5]], [[2,1],[1,4]]) == [2,1]
assert s.countRectangles([[1,1],[2,2],[3,3]], [[1,3],[1,1]]) == [1,3]
print("All tests passed for count-number-of-rectangles-containing-each-point!")
