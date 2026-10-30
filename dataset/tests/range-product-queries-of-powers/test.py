from solution import Solution
s = Solution()
assert s.productQueries(15, [[0,1],[2,2],[0,3]]) == [2,4,64]
assert s.productQueries(2, [[0,0]]) == [2]
print("All tests passed for range-product-queries-of-powers!")
