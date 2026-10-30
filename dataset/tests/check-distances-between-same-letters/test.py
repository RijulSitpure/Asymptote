from solution import Solution
s = Solution()
d1 = [1,3,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
assert s.checkDistances("abaccb", d1) == True
d2 = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
assert s.checkDistances("aa", d2) == False
print("All tests passed for check-distances-between-same-letters!")
