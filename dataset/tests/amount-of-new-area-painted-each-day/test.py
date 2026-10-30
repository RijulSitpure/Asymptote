from solution import Solution

s = Solution()
assert s.amountPainted([[1,4],[4,7],[5,8]]) == [3, 3, 1]
assert s.amountPainted([[1,4],[5,8],[4,7]]) == [3, 3, 1]
assert s.amountPainted([[1,5],[2,4]]) == [4, 0]
print("All tests passed for amount-of-new-area-painted-each-day!")
