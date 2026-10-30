from solution import Solution
s = Solution()
assert abs(s.maxPrice([[50,50],[10,10],[100,100]], 150) - 150.0) < 1e-5
assert s.maxPrice([[100,100]], 150) == -1.0
print('All tests passed for maximum-price-to-fill-a-bag!')
