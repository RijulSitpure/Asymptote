from solution import Solution
s = Solution()
assert s.checkContradictions([["a","b"],["b","c"],["a","c"]], [3.0,0.5,1.5]) == False
assert s.checkContradictions([["le","et"],["co","de"],["le","de"],["et","co"]], [2.0,3.0,5.0,7.0]) == True
print("All tests passed for check-for-contradictions-in-equations!")
