from solution import Solution
s = Solution()
assert s.findMaxK([-1,2,-3,3]) == 3
assert s.findMaxK([-1,10,6,7,-7,1]) == 7
assert s.findMaxK([-10,8,6,7,-2,-3]) == -1
print("All tests passed for largest-positive-integer-that-exists-with-its-negative!")
